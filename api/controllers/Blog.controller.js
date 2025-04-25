import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import Notification from "../models/notification.model.js";
import nodemailer from "nodemailer";

import Category from "../models/category.model.js";
import { encode } from "entities";
import http from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import WebSocket  from 'ws';
import BlogLike from "../models/bloglike.model.js";

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);

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
    // console.log(data);

    console.log("slug : ", data.slug);

    const post = new Blog({
      author: data.author,
      authorimage: data.authorimage,
      category: data.category,
      title: data.title,
      slug: data.slug ? data.slug : "",
      featuredimage: featuredImage,
      blogcontent: encode(data.blogContent),
      isFeatured: data.isFeatured,
      status: data.status,
      authorid: data.authorid || "",
      authoremail: data.authoremail || "",
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Blog Added Successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await Blog.findById(blogid).populate("category", "name");
    if (!blog) {
      next(handleError(404, "Data not found."));
    }

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    console.log(blogid);

    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid);

    const objectId = new mongoose.Types.ObjectId(data.category);

    let featuredImage = blog.featuredimage;

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "travel-blog", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    const newblog = await Blog.findByIdAndUpdate(
      blogid,
      {
        author: data.author,
        category: objectId,
        title: data.title,
        slug: data.slug,
        blogcontent: data.blogcontent,
        featuredimage: featuredImage,
        isFeatured: data.isFeatured,
        status: data.status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully.",
      newblog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateApprovalBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const newblog = await Blog.findByIdAndUpdate(
      blogid,
      {
        status: "published",
      },
      { new: true }
    ); // Ensure email is populated
    console.log(newblog);
    

    if (!newblog.authoremail) {
      return res.status(400).json({
        success: false,
        message: "Author email not found.",
      });
    }

    // Send notification
    const notification = new Notification({
      userId: newblog.authorid,
      message: `Your blog "${newblog.title}" has been approved.`,
    });
    await notification.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yadavdhiru201@gmail.com",
        pass: "euli iqei mbfd zvha",
      },
    });

    const mailOptions = {
      from: "yadavdhiru201@gmail.com",
      to: newblog?.authoremail,
      subject: "Blog Approval Notification",
      text: `Congratulations! Your blog titled "${newblog.title}" has been approved and is now live on our platform.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Blog Approved Successfully.",
      newblog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUserBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    console.log(blogid);

    const data = JSON.parse(req.body.data);

    const blog = await Blog.findById(blogid);

    const objectId = new mongoose.Types.ObjectId(data.category);

    let featuredImage = blog.featuredimage;

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "travel-blog", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    const newblog = await Blog.findByIdAndUpdate(
      blogid,
      {
        author: data.author,
        category: objectId,
        title: data.title,
        slug: data.slug,
        blogcontent: data.blogcontent,
        featuredimage: featuredImage,
        authorid: data.authorid,
        authorimage: data.authorimage,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully.",
      newblog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);
    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    

    const blog = await Blog.find({ status: "published" })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      
      .lean()
      .exec();

    const total = await Blog.countDocuments({ status: "published" });

    res.status(200).json({
      blog,
      total,
      
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog2 = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const blog = await Blog.find({ status: "published" })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean()
      .exec();

    const total = await Blog.countDocuments({ status: "published" });

    res.status(200).json({
      blog,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllPendingBlog = async (req, res, next) => {
  try {
    const blog = await Blog.find({ status: "pending" })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getTrendingBlogs = async (req, res) => {
  try {
    const trendingBlogs = await Blog.aggregate([
        // Match only published blogs
        { $match: { status: 'published' } },
        
        // Get likes data
        {
            $lookup: {
                from: 'bloglikes',
                localField: '_id',
                foreignField: 'blogid',
                as: 'likes'
            }
        },
        
        // Get comments data
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'blogid',
                as: 'comments'
            }
        },
        
        // Add engagement metrics
        {
            $addFields: {
                likesCount: { $size: "$likes" },
                commentsCount: { $size: "$comments" },
            }
        },
        
        // Calculate trending score (you can adjust weights as needed)
        {
            $addFields: {
                trendingScore: {
                    $add: [
                        "$likesCount",
                        { $multiply: ["$commentsCount", 0.8] }, // Comments weight
                        { $cond: [{ $eq: ["$isFeatured", true] }, 15, 0] }, // Featured bonus
                        { 
                            $divide: [
                                { $subtract: [new Date(), "$createdAt"] },
                                1000 * 60 * 60 * 24 // Days since creation
                            ]
                        } // Recency component (lower is better)
                    ]
                }
            }
        },
        
        // Sort by trending score (descending), then featured, then recency
        {
            $sort: {
                trendingScore: -1,
                isFeatured: -1,
                createdAt: -1
            }
        },
        
        // Limit results
        { $limit: 9 },
        
        // Project necessary fields
        {
            $project: {
                title: 1,
                slug: 1,
                featuredimage: 1,
                author: 1,
                authorimage: 1,
                createdAt: 1,
                likesCount: 1,
                commentsCount: 1,
                isFeatured: 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        blogs: trendingBlogs
    });
    
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Error fetching trending blogs",
        error: error.message
    });
}
};

// Get all featured blogs
export const getFeaturedBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const featuredBlogs = await Blog.find({
      isFeatured: true,
      status: "published",
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate("category");

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

export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug })
      .populate("category", "name slug")
      .lean()
      .exec();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    

    const blogs = await Blog.find({ category: categoryId, status: "published" })
      .populate("category", "name slug")
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      
      .lean()
      .exec();

    const total = await Blog.countDocuments({ category: categoryId, status: "published" });

    res.status(200).json({
      blogs,
      total,
      
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogsByCategory2 = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ category: categoryId, status: "published" })
      .populate("category", "name slug")
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean()
      .exec();

    const total = await Blog.countDocuments({ category: categoryId, status: "published" });
    console.log(total);
    

    res.status(200).json({
      blogs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const search = async (req, res, next) => {
  try {
    const { q } = req.params;
    

    const blog = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      
      .lean()
      .exec();

    const total = await Blog.countDocuments({ title: { $regex: q, $options: "i" } });

    res.status(200).json({
      blog,
      total,
      
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};



export const search2 = async (req, res, next) => {
  try {
    const { q } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const blog = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .skip(skip)
      .limit(parseInt(limit))
      .lean()
      .exec();

    const total = await Blog.countDocuments({ title: { $regex: q, $options: "i" } });

    res.status(200).json({
      blog,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const getBlogsByUserId = async (req, res, next) => {
  try {
    const { userid } = req.params;

    const blogs = await Blog.find({
      authorid: userid,
    })
      .populate("category", "name slug")
      .populate("author", "name _id")
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

export const getUserBlogsByCategory = async (req, res, next) => {
  try {
    let { categoryId, userid } = req.params;
    const blogs = await Blog.find({ category: categoryId, authorid: userid })
      .populate("category", "name slug")
      .populate("author", "name _id")
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

export const userSearch = async (req, res, next) => {
  try {
    const { userid, q } = req.params;

    const blog = await Blog.find({ authorid: userid, title: { $regex: q } })
      .populate("author", "name avatar role")
      .populate("category", "name slug");

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogsByTravelCategorys = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const catName = await Category.findOne({ name: categoryId }).lean().exec();

    const blogs = await Blog.find({
      category: catName?._id.toString(),
      status: "published",
    })
      .populate("category", "name slug")
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      blogs,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const sendNoti = async (req, res, next) => {
  try {



    
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const checkSlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
