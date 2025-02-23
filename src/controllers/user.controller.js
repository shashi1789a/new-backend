import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uplodeOnCloudinary} from "../utils/cloudinay.js";

const registerUser = asyncHandler (async (req, res) =>{

const {fullname, email, password} = req.body
console.log("email", email); 

// if (fullname === "") {
 //     throw new ApiError(400, "fullname is required");  // when we write like this we validate every one but we validate all in one code so use the method
 // }
if(
    [fullname, email, password,username].some(() =>                      // we an check by using map function but we use some function here
    field?.trim() === "")                       
){
    throw new ApiError(400, "All fields are required");
}

// this condition use for checking user is all ready exist or not 

const existingUser =  User.findOne({
    $or : [{username},{email}]
})


if(existingUser){
    throw new ApiError(409, "User with this email already exists");
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImagePath = req.files?.cover[0]?.path;

if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
}

// uplode from cloudnary
const avatar = await uplodeOnCloudinary(avatarLocalPath);
const coverImage = await uplodeOnCloudinary(coverImagePath);

if (!avatar) {
    throw new ApiError(500, "Failed to uplode avatar to cloudinary");
}

// create user object entery in db

const user = await User.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // agar coverimage hai to thik na hai to empty chhhod do
 })
// check user is created or not 

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"              // sara field aae but password or refreshtoken na aaee
)

if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
}

// return response
return res.status(201).json(
    new ApiResponse(200, createdUser, "user created successfully")
)


});

export {
    registerUser,
};