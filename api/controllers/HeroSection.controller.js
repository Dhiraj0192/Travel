import HeroSection from "../models/HeroSection.model.js";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";

export const addHeroSection = async (req, res, next) => {
  try {
    

    let data;
    try {
      data = JSON.parse(req.body.data);
    } catch (error) {
      return next(handleError(400, "Invalid JSON format in request body."));
    }

    let featuredImage = "";
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "travel-blog", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult?.secure_url;
    }

    const heroSection = new HeroSection({ featuredImage, title: data.title });
    await heroSection.save();

    res.status(201).json({
      success: true,
      message: "Hero section added successfully.",
      heroSection,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateHeroSection = async (req, res, next) => {
  try {

    const { heroid } = req.params;
    console.log(heroid);
    
    const data = JSON.parse(req.body.data);

    const Hero = await HeroSection.findOne();
    console.log(Hero);
    

    let featuredImage = Hero.featuredImage;

    if (req.file) {
          // Upload an image
          const uploadResult = await cloudinary.uploader
            .upload(req.file.path, { folder: "travel-blog", resource_type: "auto" })
            .catch((error) => {
              next(handleError(500, error.message));
            });
    
          featuredImage = uploadResult.secure_url;
    }

    

    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      heroid,
      
      { featuredImage : featuredImage,
        title: data.title 
      },
      { new: true }
    );

    

    res.status(200).json({
      success: true,
      message: "Hero section updated successfully.",
      updatedHeroSection,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getHeroSection = async (req, res, next) => {
  try {
    const heroSections = await HeroSection.findOne();
    res.status(200).json({
      success: true,
      heroSections,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
