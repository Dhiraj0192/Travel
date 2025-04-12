import express from "express"
import { deleteUser, showAllBlog, showAllUser, totalBlog, totalComment, totalUser } from "../controllers/Dashboard.controller.js"


const DashboardRoute = express.Router()

DashboardRoute.get('/blog-count',totalBlog)
DashboardRoute.get('/comment-count',totalComment)
DashboardRoute.get('/get-all',showAllBlog)
DashboardRoute.get('/user-count',totalUser)
DashboardRoute.get('/get-all-user',showAllUser)
DashboardRoute.delete('/delete/:userid',deleteUser)



export default DashboardRoute