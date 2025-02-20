import {v2 as cloudinary} from "cloudinary"
import fs from "fs"





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY ,
  api_secret:process.env.CLOUDINARY_API_SECRET
//   secure: true,
});



const uplodeOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;  //agar local file na hai to null return kar do
        //uplode file on cloudinary
     const response = await cloudinary.uploder.uplode(localFilePath, {
            reference_type: "auto"    //it means app kis tarah ka file uplode karna chahate ho video image etc
        })
        console.log("file will be uploded succesfully ", response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath)   // remove temporary file path from cloudinary path so it can be removed after failed upload operation 
         // remove the locally saved file as the uplode operation got failed 
         return null;
    }
}


export {uplodeOnCloudinary}