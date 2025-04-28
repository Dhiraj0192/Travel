import express from "express"

import upload from "../config/multer.js"
import { addVideo, deleteVideo, editVideo, showAllVideo, showAllVideo2, updateVideo } from "../controllers/Video.controller.js"


const VideoRoute = express.Router()

VideoRoute.post('/add', upload.single('file'),addVideo)
VideoRoute.get('/edit/:videoid',editVideo)
VideoRoute.put('/update/:videoid',upload.single('file'),updateVideo)
VideoRoute.get('/get-all2',showAllVideo2)
VideoRoute.get('/get-all',showAllVideo)
VideoRoute.delete('/delete/:videoid',deleteVideo)

export default VideoRoute