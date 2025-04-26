import express from "express"

import upload from "../config/multer.js"
import { addVideo, showAllVideo, showAllVideo2 } from "../controllers/Video.controller.js"


const VideoRoute = express.Router()

VideoRoute.post('/add', upload.single('file'),addVideo)
VideoRoute.get('/get-all2',showAllVideo2)
VideoRoute.get('/get-all',showAllVideo)

export default VideoRoute