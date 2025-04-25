import express from "express";
import { getUserNotifications, deleteNotification } from "../controllers/Notification.controller.js";

const NotificationRoute = express.Router();

NotificationRoute.get("/:userId", getUserNotifications);
NotificationRoute.delete("/:notificationId", deleteNotification);

export default NotificationRoute;
