import express from "express"
import { userLogin, userLogout, userRegister } from "../controllers/AdminUser.controller.js"

const AdminUserRoute = express.Router()

AdminUserRoute.post('/register',userRegister)
AdminUserRoute.post('/login',userLogin)

AdminUserRoute.get('/logout',userLogout)

export default AdminUserRoute