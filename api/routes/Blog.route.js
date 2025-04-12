import express from "express"
import { addBlog, deleteBlog, editBlog, getBlog, getBlogsByCategory, getFeaturedBlogs, getTrendingBlogs, search, showAllBlog, showAllPendingBlog, updateBlog } from "../controllers/Blog.controller.js"
import upload from "../config/multer.js"


const BlogRoute = express.Router()

BlogRoute.post('/add', upload.single('file'),addBlog)
BlogRoute.get('/edit/:blogid',editBlog)
BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
BlogRoute.delete('/delete/:blogid',deleteBlog)
BlogRoute.get('/get-all',showAllBlog)
BlogRoute.get('/get-all-pending-blogs',showAllPendingBlog)
BlogRoute.get('/trending',getTrendingBlogs)
BlogRoute.get('/featured',getFeaturedBlogs)
BlogRoute.get('/blog/category/:categoryId',getBlogsByCategory)
BlogRoute.get('/get-blog/:slug',getBlog)
BlogRoute.get('/search/:q',search)


export default BlogRoute