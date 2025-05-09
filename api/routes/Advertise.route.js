import express from "express"

import upload from "../config/multer.js"
import { addAdvertise, deleteAdvertise, editAdvertise, showAdvertise, singlepostaddAdvertise, singlepostdeleteAdvertise, singleposteditAdvertise, singlepostshowAdvertise, singlepostupdateAdvertise, updateAdvertise } from "../controllers/Advertise.controller.js"


const AdveriseRoute = express.Router()

AdveriseRoute.post('/add-advertise', upload.single('file'),addAdvertise)
AdveriseRoute.post('/singlepost/add-advertise', upload.single('file'),singlepostaddAdvertise)
AdveriseRoute.get('/advertise',showAdvertise)
AdveriseRoute.get('/singlepost/advertise',singlepostshowAdvertise)

AdveriseRoute.get('/edit/:advertiseid',editAdvertise)
AdveriseRoute.get('/singlepost/edit/:advertiseid',singleposteditAdvertise)
AdveriseRoute.put('/update/:advertiseid',upload.single('file'),updateAdvertise)
AdveriseRoute.put('/singlepost/update/:advertiseid',upload.single('file'),singlepostupdateAdvertise)
AdveriseRoute.delete('/delete/:advertiseid',deleteAdvertise)
AdveriseRoute.delete('/singlepost/delete/:advertiseid',singlepostdeleteAdvertise)
// BlogRoute.get('/edit/:blogid',editBlog)
// BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
// BlogRoute.put('/update-user-blog/:blogid',upload.single('file'),updateUserBlog)
// BlogRoute.delete('/delete/:blogid',deleteBlog)

export default AdveriseRoute