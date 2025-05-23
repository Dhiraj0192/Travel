import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const CloudinaryUpload =  async (localFilePath)=>{
    try {
        // Configuration
        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_APP_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
        });

        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto",
        })
        // console.log("File Successfully uploaded!!",response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null
    }
}

export {CloudinaryUpload}