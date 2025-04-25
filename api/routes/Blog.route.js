import express from "express"
import { addBlog, deleteBlog, editBlog, getBlog, getBlogsByCategory, getBlogsByTravelCategorys, getBlogsByUserId, getFeaturedBlogs, getTrendingBlogs, getUserBlogsByCategory, search, search2, sendNoti, showAllBlog, showAllBlog2, showAllPendingBlog, updateApprovalBlog, updateBlog, updateUserBlog, checkSlug } from "../controllers/Blog.controller.js"
import upload from "../config/multer.js"


const BlogRoute = express.Router()

BlogRoute.post('/add', upload.single('file'),addBlog)
BlogRoute.get('/edit/:blogid',editBlog)
BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
BlogRoute.put('/approval/:blogid',updateApprovalBlog)
BlogRoute.put('/update-user-blog/:blogid',upload.single('file'),updateUserBlog)
BlogRoute.delete('/delete/:blogid',deleteBlog)
BlogRoute.get('/get-all',showAllBlog)
BlogRoute.get('/get-all2',showAllBlog2)
BlogRoute.get('/get-all-pending-blogs',showAllPendingBlog)
BlogRoute.get('/trending',getTrendingBlogs)
BlogRoute.get('/featured',getFeaturedBlogs)
BlogRoute.get('/blog/category/:categoryId',getBlogsByCategory)
BlogRoute.get('/blog/travelcategory/:categoryId',getBlogsByTravelCategorys)
BlogRoute.get('/get-blog/:slug',getBlog)
BlogRoute.get('/search/:q',search)
BlogRoute.get('/search2/:q',search2)
BlogRoute.get('/userblog/:userid',getBlogsByUserId)
BlogRoute.get('/check-slug/:slug', checkSlug)
BlogRoute.get("/:categoryId/:userid", getUserBlogsByCategory)
BlogRoute.get('/usersearch/:userid/:q',search)
BlogRoute.post('/sendNoti/:message',sendNoti)
export default BlogRoute