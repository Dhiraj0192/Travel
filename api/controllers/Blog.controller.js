import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import {encode} from 'entities';
import http from 'http';
import {Server} from 'socket.io';
import express from 'express';
import cors from 'cors';

export const addBlog = async (req,res,next)=>{
    try {
        const data = JSON.parse(req.body.data)
        
        
        let featuredImage = ""
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
        
                featuredImage = uploadResult?.secure_url
        }
        // console.log(data);
        
        
        console.log("slug : ",data.slug);
        

        const post = new Blog({
            author: data.author,
            authorimage: data.authorimage,
            category: data.category,
            title: data.title,
            slug: data.slug ? data.slug : "",
            featuredimage : featuredImage,
            blogcontent : encode(data.blogContent),
            isFeatured : data.isFeatured,
            status: data.status,
            authorid : data.authorid || "",
            
        })
        
        await post.save()

        res.status(200).json({
            success : true,
            message : 'Blog Added Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const editBlog = async (req,res,next)=>{
    try {
        const {blogid} = req.params
        
        
        const blog = await Blog.findById(blogid).populate('category','name')
        if (!blog) {
            next(handleError(404,'Data not found.'))
        }
        
        
        res.status(200).json({
            blog
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const updateBlog = async (req,res,next)=>{
    try {
        const {blogid} = req.params
        console.log(blogid);
        
        const data = JSON.parse(req.body.data)
        

        const blog = await Blog.findById(blogid)
        
        const objectId = new mongoose.Types.ObjectId(data.category);
        
        
        let featuredImage = blog.featuredimage
        
        
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

        const newblog = await Blog.findByIdAndUpdate(blogid,{
            author : data.author,
            category: objectId,
            title: data.title,
            slug: data.slug,
            blogcontent: data.blogcontent,
            featuredimage : featuredImage,
            isFeatured: data.isFeatured,
            status : data.status,
        },{new : true})


        res.status(200).json({
            success : true,
            message : 'Blog Updated Successfully.',
            newblog
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const updateApprovalBlog = async (req,res,next)=>{
  try {
    const app = express();

      const {blogid} = req.params
  

      const newblog = await Blog.findByIdAndUpdate(blogid,{
          
          status : "published",
      },{new : true})
      console.log(newblog);
      

      const title = newblog?.title;
      const message = `Hey, your blog : ${title} is approved from Traveller's Mirror`
      const server = http.createServer(app)
      const io = new Server(server,{
        cors:{
          origin: '*',
          methhod: ['GET','POST'],
        }
      })

      io.emit('pushNotification',{
        message
      })

      io.on('connection',(socket)=>{
        console.log('Connevted');
        socket.on('disconnect',()=>{
          console.log('Client disconnected');
          
        })
        
      })


      res.status(200).json({
          success : true,
          message : 'Blog Approved Successfully.',
          newblog
      })
      
  } catch (error) {
      next(handleError(500, error.message))
  }

}

export const updateUserBlog = async (req,res,next)=>{
  try {
      const {blogid} = req.params
      console.log(blogid);
      
      const data = JSON.parse(req.body.data)
      

      const blog = await Blog.findById(blogid)
      
      const objectId = new mongoose.Types.ObjectId(data.category);
      
      
      let featuredImage = blog.featuredimage
      
      
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

      const newblog = await Blog.findByIdAndUpdate(blogid,{
          author : data.author,
          category: objectId,
          title: data.title,
          slug: data.slug,
          blogcontent: data.blogcontent,
          featuredimage : featuredImage,
          authorid : data.authorid,
          authorimage : data.authorimage,
          
          
      },{new : true})


      res.status(200).json({
          success : true,
          message : 'Blog Updated Successfully.',
          newblog
      })
      
  } catch (error) {
      next(handleError(500, error.message))
  }

}

export const deleteBlog = async (req,res,next)=>{
    try {
        const {blogid} = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success : true,
            message: 'Blog Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const showAllBlog = async (req,res,next)=>{
    try {
        

        const blog = await Blog.find({ status: 'published' }).populate('category','name slug').sort({createdAt : -1}).lean().exec()

        res.status(200).json({
            blog
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const showAllPendingBlog = async (req,res,next)=>{
  try {
      

      const blog = await Blog.find({ status: 'pending' }).populate('category','name slug').sort({createdAt : -1}).lean().exec()

      res.status(200).json({
          blog
      })
      
  } catch (error) {
      next(handleError(500, error.message))
  }

}

export const getTrendingBlogs = async (req, res) => {
    try {
        // First get all featured blog IDs
    const featuredBlogs = await Blog.find({ isFeatured: true,status: 'published' }).select('_id');
    const featuredIds = featuredBlogs.map(blog => blog._id);
      const { limit = 9, timeRange = 'week' } = req.query;
      
      let dateFilter = {};
      const now = new Date();
      
      if (timeRange === 'day') {
        dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 1)) } };
      } else if (timeRange === 'week') {
        dateFilter = { createdAt: { $gte: new Date(now.setDate(now.getDate() - 7)) } };
      } else if (timeRange === 'month') {
        dateFilter = { createdAt: { $gte: new Date(now.setMonth(now.getMonth() - 1)) } };
      }

      const trendingBlogs = await Blog.aggregate([
        { 
          $match: { 
            ...dateFilter,
            _id: { $nin: featuredIds } // Exclude by ID
          } 
        },
        // Rest of your aggregation pipeline...
        {
            $addFields: {
              engagementScore: {
                $add: [
                  { $multiply: ['$views', 0.5] },
                  { $multiply: ['$likes', 1] },
                  { $multiply: ['$comments', 1.5] },
                  { $multiply: ['$shares', 2] }
                ]
              }
            }
          },
          { $sort: { engagementScore: -1 } },
          { $limit: parseInt(limit) },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category'
            }
          },
          { $unwind: '$category' }
      ]);
      
    
    //     { $match: dateFilter,
    //         isFeatured : false
    //      },
        
    //     {
    //       $addFields: {
    //         engagementScore: {
    //           $add: [
    //             { $multiply: ['$views', 0.5] },
    //             { $multiply: ['$likes', 1] },
    //             { $multiply: ['$comments', 1.5] },
    //             { $multiply: ['$shares', 2] }
    //           ]
    //         }
    //       }
    //     },
    //     { $sort: { engagementScore: -1 } },
    //     { $limit: parseInt(limit) },
    //     {
    //       $lookup: {
    //         from: 'categories',
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'category'
    //       }
    //     },
    //     { $unwind: '$category' }
    //   ]);
      
      res.json(trendingBlogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get all featured blogs
export const getFeaturedBlogs = async (req, res) => {
    try {
      const { limit = 5 } = req.query;
      
      const featuredBlogs = await Blog.find({ 
        isFeatured: true,
        status: 'published'
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category');
      
      res.json(featuredBlogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // export const getBlogsByCategory = async (req, res) => {
  //   try {
  //     const { categoryId } = req.params;
  //     const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
      
  //     const blogs = await Blog.find({ category: categoryId })
  //       .sort(sort)
  //       .skip((page - 1) * limit)
  //       .limit(parseInt(limit))
  //       .populate('category', 'name slug') // Only get name and slug from category
  //       .populate('author', 'username avatar'); // Example author population
      
  //     const total = await Blog.countDocuments({ category: categoryId });
      
  //     res.json({
  //       blogs,
  //       total,
  //       pages: Math.ceil(total / limit),
  //       currentPage: page
  //     });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };


  export const getBlog = async (req,res,next) =>{
    try {

      const {slug} = req.params
      const blog = await Blog.findOne({slug}).populate('category','name slug').lean().exec()

      res.status(200).json({
        blog
      })
      
    } catch (error) {
      next(handleError(500, error.message))
    }
  }

  export const getBlogsByCategory = async (req, res,next) => {
    try {

      const { categoryId } = req.params;
      const blogs = await Blog.find({ category: categoryId,status: 'published' }).populate('category', 'name slug').populate('author', 'username avatar').sort({createdAt : -1}).lean().exec();

      res.status(200).json({
        blogs
      })
      
    } catch (error) {
      next(handleError(500, error.message))
    }
  }


  export const search = async (req, res, next) =>{
    try {

      const { q } = req.params
      const blog = await Blog.find({title: {$regex : q, $options: 'i'}}).populate('author','name avatar role').populate('category','name slug').lean().exec()

      res.status(200).json({
        blog,
      })
      
    } catch (error) {
      next(handleError(500, error.message))
    }
  }


  export const getBlogsByUserId = async (req, res, next) => {
    try {
        const { userid } = req.params; 
        
        const blogs = await Blog.find({ 
            
            authorid: userid
        })
        .populate('category', 'name slug')
        .populate('author', 'name _id')
        .sort({ createdAt: -1 })
        .lean()
        .exec();

        res.status(200).json({
            success: true,
            blogs
        });
        
    } catch (error) {
        next(handleError(500, error.message));
    }
}

export const getUserBlogsByCategory = async (req, res, next) => {
  try {
      let { categoryId ,userid} = req.params;
      const blogs = await Blog.find({ category: categoryId, authorid: userid })
          .populate("category", "name slug")
          .populate('author', 'name _id')
          .sort({ createdAt: -1 })
          .lean()
          .exec();

      res.status(200).json({
          success: true,
          blogs,
      });
  } catch (error) {
      next(handleError(500, error.message));
  }
};

export const userSearch = async (req, res, next) =>{
  try {

    const { userid ,q} = req.params
    
    const blog = await Blog.find({authorid: userid,title: {$regex : q}}).populate('author','name avatar role').populate('category','name slug')

    res.status(200).json({
      blog,
    })
    
  } catch (error) {
    next(handleError(500, error.message))
  }
}


export const getBlogsByTravelCategorys = async (req, res,next) => {
  try {

    const { categoryId } = req.params;
    const catName = await Category.findOne({ name: categoryId }).lean().exec();
    
    const blogs = await Blog.find({ category: catName?._id.toString(),status: 'published' }).populate('category', 'name slug').populate('author', 'username avatar').sort({createdAt : -1}).lean().exec();

    res.status(200).json({
      blogs
    })
    
  } catch (error) {
    next(handleError(500, error.message))
  }
}

  