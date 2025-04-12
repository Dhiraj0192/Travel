import {handleError} from "../helpers/handleError.js"
import Comment from "../models/comment.model.js"
export const addcomment = async (req,res,next) => {
    try {
        const {author, blogid, comment} = req.body
        const newComment = new Comment({
            author :author,
            blogid : blogid,
            coment : comment
        })

        await newComment.save()
        res.status(200).json({
            success : true,
            message : 'Comment submited.',
            comment : newComment
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const getComment = async (req,res,next) => {
    try {
        const {blogid} = req.params
        const comments = await Comment.find({blogid}).populate('author','name avatar').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            comments
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const commentCount = async (req,res,next) => {
    try {
        const {blogid} = req.params
        const commentCount = await Comment.countDocuments({blogid})
        res.status(200).json({
            commentCount
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllComment = async (req,res,next) => {
    try {
        
        const comments = await Comment.find().populate('author','name avatar email').populate('blogid','title').sort({createdAt: -1}).lean().exec()
        res.status(200).json({
            comments
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const deleteComment = async (req,res,next)=>{
    try {
        const {commentid} = req.params
        await Comment.findByIdAndDelete(commentid)
        res.status(200).json({
            success : true,
            message: 'Comment Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

  export const search = async (req, res, next) =>{
    try {

      const { q } = req.params
      const comment = await Comment.find({coment: {$regex : q, $options: 'i'}}).populate('author','name avatar role').lean().exec()

      res.status(200).json({
        comment,
      })
      
    } catch (error) {
      next(handleError(500, error.message))
    }
  }