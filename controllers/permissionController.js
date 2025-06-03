const { Permission } = require("../models");

// 📋 Get all permissions
exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json({
            success: true,
            count: permissions.length,
            data: permissions
        });
    } catch (error) {
        console.error("❌ Error fetching permissions:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// ➕ Create a new permission
exports.createPermission = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the permission already exists
        const existingPermission = await Permission.findOne({ where: { name } });
        if (existingPermission) {
            return res.status(409).json({
                success: false,
                message: "Permission already exists",
            });
        }

        const permission = await Permission.create({ name });
        res.status(201).json({
            success: true,
            data: permission
        });
    } catch (error) {
        console.error("❌ Error creating permission:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// 📝 Update a permission
exports.updatePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        const { name } = req.body;

        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            return res.status(404).json({
                success: false,
                message: "Permission not found",
            });
        }

        permission.name = name;
        await permission.save();

        res.status(200).json({
            success: true,
            data: permission
        });
    } catch (error) {
        console.error("❌ Error updating permission:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// ❌ Delete a permission
exports.deletePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;

        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            return res.status(404).json({
                success: false,
                message: "Permission not found",
            });
        }

        await permission.destroy();

        res.status(200).json({
            success: true,
            message: "Permission deleted successfully",
        });
    } catch (error) {
        console.error("❌ Error deleting permission:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
