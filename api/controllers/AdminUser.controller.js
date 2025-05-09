import {asynchandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import {CloudinaryUpload} from "../utils/Cloudinary.js";
import { Adminuser } from "../models/adminUser.model.js";

const userRegister = asynchandler( async (req,res)=>{
    

    console.log(req.body);

    const {name, email, password} = req.body;
    if ([name,email,password].some((field)=>field?.trim() === "")) {
        throw new ApiError(400,"All Fields are required !!");
    }

    const alredyRegister = await Adminuser.findOne({email});
    if (alredyRegister) {
        throw new ApiError(409, "User with this email is already registered !!");
    }

    const avatarLoacalFilePath = req.files?.avatar[0]?.path;

    if (avatarLoacalFilePath) {
        const avatarUpload = await CloudinaryUpload(avatarLoacalFilePath);
        if (!avatarUpload) throw new ApiError(403, "Somthing went wrong while uploading image");
    }

    const user = await Adminuser.create({
        fullName : name,
        email,
        password,
        avatar : avatarLoacalFilePath ? avatarUpload?.url : ""
    });

    const createdUser = await Adminuser.findById(user._id).select("-refreshToken -password");
    
    if (!createdUser) throw new ApiError(500, "Somthing went wrong while creating user object !!");

    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User Successfully Registered !!"
        )
    );


})

const userLogin = asynchandler( async (req,res) => {
    
    

    const {email,password} = req.body;
    
    if ([email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required !!");
    }

    const user = await Adminuser.findOne({email});

    if (!user) throw new ApiError(404,"User not registered with this crenditials !!");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(409,"Invalid user crenditials");

    const accessToken = await user.createAccessTocken;
    const refreshToken = await user.createRefreshTocken;

    if(!accessToken || !refreshToken) throw new ApiError(500, "Somthing went wrong while creating access token and refresh token");

    user.refreshToken = refreshToken;
    await user.save();

    const logedInUserer = await Adminuser.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly : true,
        secure : true
    }

    return res.status(201).cookie("AccessToken",accessToken,option).cookie("RefreshToken",refreshToken,option).json(new ApiResponse(
        200,
        {
            user : accessToken,refreshToken,logedInUserer
        },
        "User Successfully LogedIn !!"
    ));


})

const userLogout = asynchandler( async (req,res) => {
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
})

export {userRegister,userLogin,userLogout}