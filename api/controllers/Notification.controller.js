import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ success: true, message: "Notification deleted successfully." });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
