import express from "express"

import upload from "../config/multer.js"
import { addPackage, deletePackage, editPackage, search, showAllPackages, updatePackage } from "../controllers/Package.controller.js"


const PackageRoute = express.Router()

PackageRoute.post('/add-package', upload.single('file'),addPackage)
PackageRoute.get('/all-package',showAllPackages)
PackageRoute.get('/search/:q',search)
PackageRoute.get('/edit/:packageid',editPackage)
PackageRoute.put('/update/:packageid',upload.single('file'),updatePackage)
PackageRoute.delete('/delete/:packageid',deletePackage)
// BlogRoute.get('/edit/:blogid',editBlog)
// BlogRoute.put('/update/:blogid',upload.single('file'),updateBlog)
// BlogRoute.put('/update-user-blog/:blogid',upload.single('file'),updateUserBlog)
// BlogRoute.delete('/delete/:blogid',deleteBlog)

export default PackageRoute