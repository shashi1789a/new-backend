// import { Schema } from "mongoose";
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({

    username:{
        Type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
        
    },
    email:{
        Type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
     fullname:{
        Type: String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        Type: String,
        required:true
    },
    coverImage:{
        Type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required:[true,"password is required"],
        minlength:8
    },
    refreshToken: {
     type:String
    },
},
{
    timeseries:true
}
)
userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next();
    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
    
})//pre hook use for incrypt password just before data will be  saved it is a middleware element

userSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRE,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.refreshTokenToken = function () {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.model("User",userSchema);