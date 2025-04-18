import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
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
import http from "http";
import { WebSocketServer } from "ws";

dotenv.config();

const port = process.env.PORT;
const app = express();
const server = createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    try {
      // Log raw message for debugging
      console.log("Raw message received:", message);

      // Ensure the message is a valid UTF-8 string
      const parsedMessage = JSON.parse(message.toString("utf-8"));
      console.log("Parsed message:", parsedMessage);

      // Optionally, send a response back to the client
      ws.send(JSON.stringify({ success: true, message: "Message received" }));
    } catch (error) {
      console.error("Invalid WebSocket message:", error.message);
      ws.close(1002, "Protocol error"); // Close connection with error code 1002
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });

  ws.on("close", (code, reason) => {
    console.log(`WebSocket client disconnected. Code: ${code}, Reason: ${reason}`);
  });
});

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

app.post("/sendNotification", (req, res) => {
  const message = req.body.message;

  io.emit("pushNotification", {
    message,
  });

  res.status(200).send({
    message: "Sent",
  });

  io.on("connection", (socket) => {
    console.log("Connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});

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
