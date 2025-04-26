import Video from "../models/video.model.js";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";

export const addVideo = async (req, res, next) => {
    try {
      const data = JSON.parse(req.body.data);
  
      let video = "";
      if (req.file) {
        // Upload an image
        const uploadResult = await cloudinary.uploader
          .upload(req.file.path, { folder: "travel-blog", resource_type: "auto" })
          .catch((error) => {
            next(handleError(500, error.message));
          });
  
          video = uploadResult?.secure_url;
      }
      // console.log(data);
  
      
  
      const videoBlog = new Video({
        author: data.author,
        authorimage: data.authorimage,
       
        title: data.title,
        videolink: data.link,
        video : video,
        authorid: data.authorid || "",
        authoremail: data.authoremail || "",
      });
  
      await videoBlog.save();
  
      res.status(200).json({
        success: true,
        message: "Video Added Successfully.",
      });
    } catch (error) {
      next(handleError(500, error.message));
    }
  };

  export const showAllVideo2 = async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;
  
      const video = await Video.find()
        
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean()
        .exec();
  
      const total = await Video.countDocuments();
  
      res.status(200).json({
        video,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      next(handleError(500, error.message));
    }
  };

  export const showAllVideo = async (req, res, next) => {
    try {
      
  
      const video = await Video.find()
        
        .sort({ createdAt: -1 })
        
        .lean()
        .exec();
  
      const total = await Video.countDocuments();
  
      res.status(200).json({
        video,
        total,
        
      });
    } catch (error) {
      next(handleError(500, error.message));
    }
  };
  