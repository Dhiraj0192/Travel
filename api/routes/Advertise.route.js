import express from "express"

import upload from "../config/multer.js"
import { addAdvertise, deleteAdvertise, editAdvertise, showAdvertise, updateAdvertise } from "../controllers/Advertise.controller.js"


const AdveriseRoute = express.Router()

AdveriseRoute.post('/add-advertise', upload.single('file'),addAdvertise)
AdveriseRoute.get('/advertise',showAdvertise)

AdveriseRoute.get('/edit/:advertiseid',editAdvertise)
AdveriseRoute.put('/update/:advertiseid',upload.single('file'),updateAdvertise)
AdveriseRoute.delete('/delete/:advertiseid',deleteAdvertise)
// BlogRoute.get('/edit/:blogid',editBlog)
// BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
// BlogRoute.put('/update-user-blog/:blogid',upload.single('file'),updateUserBlog)
// BlogRoute.delete('/delete/:blogid',deleteBlog)

export default AdveriseRoute