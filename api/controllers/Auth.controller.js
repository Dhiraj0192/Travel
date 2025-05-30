import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const Register = async (req,res,next)=>{
    try {
        const { name, email , password} = req.body
        const checkuser = await User.findOne({email})
        if (checkuser){
            //user already resister
            next(handleError(409, 'User already registered.'))
        }

        // register user
        const hashedPassword = bcryptjs.hashSync(password)
        const user = new User({
            name,email,password: hashedPassword
        })

        await user.save();

        res.status(200).json({
            success:true,
            message: "Registration successful. Welcome to Traveller's Mirror, let's login!"
        })

        
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(handleError(404, "Invalid login credentials."));
    }

    const hashedPassword = user.password;

    // Use await to handle bcryptjs.compare properly
    const comparedPassword = await bcryptjs.compare(password, hashedPassword);
    if (!comparedPassword) {
      return next(handleError(404, "Invalid login credentials."));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newuser = user.toObject({ getters: true });
    delete newuser.password;

    res.status(200).json({
      success: true,
      user: newuser,
      message: "Welcome to Traveller's Mirror !!.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req,res)=>{
    try {
        const {name,email,avatar} = req.body
        let user
        user = await User.findOne({email})
        if(!user){
            const password = Math.random().toString()
            const hashedPassword = bcryptjs.hashSync(password)
            const newUser = new User({
                name,email,password:hashedPassword,avatar
            })

            user = await newUser.save()
        }


        const token = jwt.sign({
            _id: user._id,
            name:user.name,
            email: user.email,
            avatar: user.avatar
        },process.env.JWT_SECRET)

        res.cookie('access_token',token,{
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
            path:'/'
        })

        const newuser = user.toObject({ getters: true})
        delete newuser.password

        res.status(200).json({
            success: true,
            user:newuser,
            message: "Welcome to Traveller's Mirror !!."
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const Logout = async (req,res)=>{
    try {
        

        res.clearCookie('access_token',{
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
            path:'/'
        })

        res.status(200).json({
            success: true,
            
            message: 'Logout successful.'
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const GoogleOAuthCallback = async (req, res, next) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ message: 'No code provided' });
        }

        // Exchange code for tokens
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.BACKEND_URL + '/api/auth/google/callback',
                grant_type: 'authorization_code',
            },
        });

        const { access_token, id_token } = tokenRes.data;
        
        // Get user info
        const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const { name, email, picture } = userInfoRes.data;
        
        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
            const password = Math.random().toString();
            const hashedPassword = bcryptjs.hashSync(password);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                avatar: picture,
            });
            user = await newUser.save();
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
        }, process.env.JWT_SECRET);

        // Set cookie and redirect
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/',
        });

        const newuser = user.toObject({ getters: true})
        delete newuser.password

        // Redirect to frontend with token and user as query params
        res.redirect(`${process.env.FRONTEND_URL}/home?token=${token}&user=${encodeURIComponent(JSON.stringify(newuser))}`);
        
    } catch (error) {
        console.error('Google OAuth Error:', error.response?.data || error.message);
        // Redirect to frontend with error
        res.redirect(`${process.env.FRONTEND_URL}/login?error=google_auth_failed`);
    }
};