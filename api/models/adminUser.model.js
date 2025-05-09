import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"; 


const adminuserSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : [true, "FullName is required!"],

    },
    email : {
        type : String,
        required : [true, "Email is required!"],
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : [true, "Password is required"],
    },
    avatar : {
        type : String,
        
    },
    refreshToken : {
        type : String
    }

},{timestamps:true})

adminuserSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

adminuserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminuserSchema.methods.createAccessTocken = function (){
    jsonwebtoken.sign(
        {
            _id : this._id,
            fullName : this.fullName,
            email : this.email,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXP
        }
    )
}

adminuserSchema.methods.createRefreshTocken = function (){
    jsonwebtoken.sign(
        {
            _id : this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXP
        }
    )
}

export const Adminuser = mongoose.model("Adminuser", adminuserSchema)