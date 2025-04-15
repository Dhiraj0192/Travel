import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Package from "../models/package.model.js";
import Advertise from "../models/Advertise.model.js";

export const addAdvertise = async (req,res,next)=>{
    try {
        
        
        
        let advertiseImage = ""
        if (req.file) {
              // Upload an image
              const uploadResult = await cloudinary.uploader
                .upload(
                  req.file.path,
                  {folder : 'travel-blog',resource_type : 'auto'}
                )
                .catch((error) => {
                  next(handleError(500,error.message))
                });
        
                advertiseImage = uploadResult?.secure_url
        }
       
        

        const adverise = new Advertise({
            image: advertiseImage,
            
            
        })
        
        await adverise.save()

        res.status(200).json({
            success : true,
            message : 'Adverise Added Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const showAdvertise = async (req,res,next)=>{
    try {
        

        const advertise = await Advertise.find().sort({createdAt : -1}).lean().exec()

        res.status(200).json({
            advertise
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}



  export const editAdvertise = async (req,res,next)=>{
      try {
          const {advertiseid} = req.params
          
          
          const advertise = await Advertise.findById(advertiseid)
          if (!advertise) {
              next(handleError(404,'Data not found.'))
          }
          
          
          res.status(200).json({
            advertise
          })
          
      } catch (error) {
          next(handleError(500, error.message))
      }
  
  }
  
  export const updateAdvertise = async (req,res,next)=>{
      try {
          const {advertiseid} = req.params
          
          
          
          
  
          const adverise = await Advertise.findById(advertiseid)
          
          
          
          
          let advertiseImage = adverise.advertiseImage
          
          
          if (req.file) {
                // Upload an image
                const uploadResult = await cloudinary.uploader
                  .upload(
                    req.file.path,
                    {folder : 'travel-blog',resource_type : 'auto'}
                  )
                  .catch((error) => {
                    next(handleError(500,error.message))
                  });
          
                  advertiseImage = uploadResult.secure_url
          }
  
          const newAdvertise = await Advertise.findByIdAndUpdate(advertiseid,{
              
              
              image : advertiseImage,
              
          },{new : true})
  
  
          res.status(200).json({
              success : true,
              message : 'Advertise Updated Successfully.',
              newAdvertise
          })
          
      } catch (error) {
          next(handleError(500, error.message))
      }
  
  }

export const deleteAdvertise = async (req,res,next)=>{
    try {
        const {advertiseid} = req.params
        await Advertise.findByIdAndDelete(advertiseid)
        res.status(200).json({
            success : true,
            message: 'Advertise Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}