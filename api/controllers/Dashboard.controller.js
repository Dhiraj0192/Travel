import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js"


export const totalBlog = async (req, res, next) => {
  try {
    const totalBlog = await Blog.countDocuments();
    res.status(200).json({
      totalBlog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const totalComment = async (req, res, next) => {
  try {
    const totalComment = await Comment.countDocuments();
    res.status(200).json({
      totalComment,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req,res,next)=>{
    try {
        const { limit = 9 } = req.query;

        const blog = await Blog.find().populate('category','name slug').sort({createdAt : -1})?.limit(parseInt(limit)).lean().exec()

        res.status(200).json({
            blog
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const showAllPendingBlog = async (req,res,next)=>{
  try {
      const { limit = 9 } = req.query;

      const blog = await Blog.find({status : 'pending'}).populate('category','name slug').sort({createdAt : -1})?.limit(parseInt(limit)).lean().exec()

      res.status(200).json({
          blog
      })
      
  } catch (error) {
      next(handleError(500, error.message))
  }

}

export const totalUser = async (req, res, next) => {
  try {
    const totaluser = await User.countDocuments();
    res.status(200).json({
      totaluser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllUser = async (req,res,next)=>{
  try {
      const { limit = 5 } = req.query;

      const user = await User.find().sort({createdAt : -1})?.limit(parseInt(limit)).lean().exec()

      res.status(200).json({
          user
      })
      
  } catch (error) {
      next(handleError(500, error.message))
  }

}

export const deleteUser = async (req,res,next)=>{
    try {
        const {userid} = req.params
        await User.findByIdAndDelete(userid)
        res.status(200).json({
            success : true,
            message: 'User Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}


