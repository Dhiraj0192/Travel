import express from "express"
import upload from "../config/multer.js"
import { uploadImageCk } from "../controllers/Ckeditor.controller.js"
const UploadRoute = express.Router()

UploadRoute.post('/upload', upload.single('file'),uploadImageCk)


export default UploadRoute
