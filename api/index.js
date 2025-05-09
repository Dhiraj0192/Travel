import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";

import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRoute from "./routes/Comment.route.js";
import BlogLikeRoute from "./routes/Bloglike.route.js";
import DashboardRoute from "./routes/Dashboard.route.js";
import UploadRoute from "./routes/Upload.route.js";
import PackageRoute from "./routes/Package.route.js";
import AdveriseRoute from "./routes/Advertise.route.js";

import ContactRoute from "./routes/Contact.route.js";
import emailRoutes from "./routes/email.routes.js";
import NotificationRoute from "./routes/Notification.route.js";
import heroSectionRoutes from "./routes/HeroSection.routes.js";
import OtherRouter from "./routes/Other.routes.js";
import VideoRoute from "./routes/Video.route.js";
import AdminUserRoute from "./routes/Adminuser.route.js";


dotenv.config();

const port = process.env.PORT;
const app = express();
const server = createServer(app); // Create an HTTP server




app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/blog-like", BlogLikeRoute);
app.use("/api/dashboard", DashboardRoute);
app.use("/api/ck", UploadRoute);
app.use("/api/package", PackageRoute);
app.use("/api/advertise", AdveriseRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/email", emailRoutes);
app.use("/api/notification", NotificationRoute);
app.use("/api/herosection", heroSectionRoutes);
app.use("/api/other", OtherRouter);
app.use("/api/video", VideoRoute);
app.use("/api/adminuser", AdminUserRoute);

mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "blog" })
  .then(() => console.log("Database connected."))
  .catch((err) => console.log("Database connection failed.", err));

server.listen(port, () => {
  console.log("Server running on port:", port);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message, // Use err.message here
  });
});
