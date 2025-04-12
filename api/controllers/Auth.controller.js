import { handleError } from "../helpers/handleError.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
            message: 'Registration successful.'
        })

        
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const Login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            next(handleError(404,'Invalid login credentials.'))
        }

        const hashedPassword = user.password

        const comparedPassword = bcryptjs.compare(password, hashedPassword)
        if (!comparedPassword) {
            next(handleError(404,'Invalid login credentials.'))
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
            message: 'login successful.'
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

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
            message: 'login successful.'
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