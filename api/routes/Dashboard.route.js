import express from "express"
import { deleteUser, showAllBlog, showAllPendingBlog, showAllUser, totalBlog, totalComment, totalUser } from "../controllers/Dashboard.controller.js"


const DashboardRoute = express.Router()

DashboardRoute.get('/blog-count',totalBlog)
DashboardRoute.get('/comment-count',totalComment)
DashboardRoute.get('/get-all',showAllBlog)
DashboardRoute.get('/get-all-pending-blog',showAllPendingBlog)
DashboardRoute.get('/user-count',totalUser)
DashboardRoute.get('/get-all-user',showAllUser)
DashboardRoute.delete('/delete/:userid',deleteUser)



export default DashboardRoute