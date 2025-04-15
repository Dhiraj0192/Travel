import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Package from "../models/package.model.js";

export const addPackage = async (req,res,next)=>{
    try {
        const data = JSON.parse(req.body.data)
        
        
        let packageImage = ""
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
        
                packageImage = uploadResult?.secure_url
        }
       
        

        const packag = new Package({
            title: data.title,
            price: data.price,
            packageurl: data.packageurl,
            packageImage :packageImage,
            
        })
        
        await packag.save()

        res.status(200).json({
            success : true,
            message : 'Package Added Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const showAllPackages = async (req,res,next)=>{
    try {
        

        const packag = await Package.find().sort({createdAt : -1}).lean().exec()

        res.status(200).json({
            packag
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const search = async (req, res, next) =>{
    try {

      const { q } = req.params
      const packag = await Package.find({title: {$regex : q, $options: 'i'}}).lean().exec()

      res.status(200).json({
        packag,
      })
      
    } catch (error) {
      next(handleError(500, error.message))
    }
  }

  export const editPackage = async (req,res,next)=>{
      try {
          const {packageid} = req.params
          
          
          const packag = await Package.findById(packageid)
          if (!packag) {
              next(handleError(404,'Data not found.'))
          }
          
          
          res.status(200).json({
            packag
          })
          
      } catch (error) {
          next(handleError(500, error.message))
      }
  
  }
  
  export const updatePackage = async (req,res,next)=>{
      try {
          const {packageid} = req.params
          
          
          const data = JSON.parse(req.body.data)
          
  
          const packag = await Package.findById(packageid)
          
          
          
          
          let packageImage = packag.packageImage
          
          
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
          
                  featuredImage = uploadResult.secure_url
          }
  
          const newPackage = await Package.findByIdAndUpdate(packageid,{
              
              title: data.title,
              price: data.price,
              packageurl: data.packageurl,
              packageImage : packageImage,
              
          },{new : true})
  
  
          res.status(200).json({
              success : true,
              message : 'Package Updated Successfully.',
              newPackage
          })
          
      } catch (error) {
          next(handleError(500, error.message))
      }
  
  }

export const deletePackage = async (req,res,next)=>{
    try {
        const {packageid} = req.params
        await Package.findByIdAndDelete(packageid)
        res.status(200).json({
            success : true,
            message: 'Package Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}