const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Create a new notification
router.post("/", notificationController.createNotification);

// Get all notifications for a user
router.get("/:userId", notificationController.getUserNotifications);

// Mark a notification as read
router.patch("/:notificationId/read", notificationController.markAsRead);

// Mark a notification as unread
router.patch("/:notificationId/unread", notificationController.markAsUnread);

// Delete a notification
router.delete("/:notificationId", notificationController.deleteNotification);

module.exports = router;
