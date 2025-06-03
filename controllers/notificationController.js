const { Notification, User } = require("../models");


exports.createNotification = async (req, res) => {
    try {
        const { user_id, type, message } = req.body;
        
        // Validate input
        if (!user_id || !type || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        
        // Create the notification
        const notification = await Notification.create({ user_id, type, message });
        
        res.status(201).json({ success: true, data: notification });
    } catch (error) {
        console.error("❌ Error creating notification:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const notifications = await Notification.findAll({
            where: { user_id: userId },
            include: [{ model: User, attributes: ["id", "username", "full_name"] }],
            order: [["created_at", "DESC"]],
        });

        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found." });
        }

        notification.is_read = true;
        await notification.save();

        res.status(200).json({ success: true, message: "Notification marked as read." });
    } catch (error) {
        console.error("❌ Error marking notification as read:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.markAsUnread = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found." });
        }

        notification.is_read = false;
        await notification.save();

        res.status(200).json({ success: true, message: "Notification marked as unread." });
    } catch (error) {
        console.error("❌ Error marking notification as unread:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ success: false, message: "Notification not found." });
        }

        await notification.destroy();

        res.status(200).json({ success: true, message: "Notification deleted successfully." });
    } catch (error) {
        console.error("❌ Error deleting notification:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
