import express from "express"
import { addcomment, commentCount, deleteComment, getAllComment, getComment, search } from "../controllers/Comment.controller.js"



const CommentRoute = express.Router()

CommentRoute.post('/add',addcomment)

CommentRoute.get('/get/:blogid',getComment)
CommentRoute.get('/get-all',getAllComment)
CommentRoute.get('/get-count/:blogid',commentCount)
CommentRoute.delete('/delete/:commentid',deleteComment)
CommentRoute.get('/search/:q',search)


export default CommentRoute