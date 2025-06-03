const { User, Role, UserActivityLog, UserRole } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// 🔐 Password Hashing Helper
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// 🚀 Get All Users with Roles
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Role,
                    as: "roles",
                    through: { attributes: [] } // Exclude pivot table details
                },
                {
                    model: UserActivityLog,
                    foreignKey: "user_id"
                }
            ]
        });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// 🔍 Get Single User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id },
            include: [
                {
                    model: Role,
                    as: "roles",
                    through: { attributes: [] }
                },
                {
                    model: UserActivityLog,
                    foreignKey: "user_id"
                }
            ]
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("❌ Error fetching user by ID:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// ➕ Create a New User
exports.createUser = async (req, res) => {
    try {
        const { email, password, username, full_name, plan_type, roles } = req.body;
      
        // Hash the password
        const password_hash = await hashPassword(password);

        // Create the user
        const user = await User.create({
            email,
            password_hash,
            username,
            full_name,
            plan_type,
        });

        // Associate roles if provided
        if (roles && roles.length > 0) {
            const roleInstances = await Role.findAll({
                where: { id: { [Op.in]: roles } }
            });
            await user.setRoles(roleInstances);
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// ✏️ Update a User
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, username, full_name, plan_type, roles, is_active } = req.body;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update basic user info
        await user.update({ email, username, full_name, plan_type, is_active });

        // Update roles if provided
        if (roles && roles.length > 0) {
            const roleInstances = await Role.findAll({
                where: { id: { [Op.in]: roles } }
            });
            await user.setRoles(roleInstances);
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        console.error("❌ Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// ❌ Delete a User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.destroy();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("❌ Error deleting user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
