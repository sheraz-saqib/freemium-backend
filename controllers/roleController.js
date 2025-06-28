const RoleModal = require("../models/role.model");
const { Op } = require("sequelize");

// Create a new role
const addRoleController = async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({
        message: "Role name is required",
        success: false,
      });
    }

    const existingRole = await RoleModal.findOne({ where: { role_name } });

    if (existingRole) {
      return res.status(409).json({
        message: "Role already exists with this name",
        success: false,
      });
    }

    const newRole = await RoleModal.create({ role_name });

    return res.status(201).json({
      message: "Role created successfully",
      success: true,
      role: newRole,
    });
  } catch (err) {
    console.error("Error creating role:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Delete a role
const deleteRoleController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Role ID is required",
        success: false,
      });
    }

    const deleted = await RoleModal.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Role not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Role deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting role:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Get all roles
const getAllRolesController = async (req, res) => {
  try {
    const roles = await RoleModal.findAll();

    return res.status(200).json({
      message: "All roles fetched successfully",
      success: true,
      totalCount: roles.length,
      roles,
    });
  } catch (err) {
    console.error("Error fetching roles:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update a role
const editRoleController = async (req, res) => {
  try {
    const { id, role_name } = req.body;

    if (!id || !role_name) {
      return res.status(400).json({
        message: "Role ID and name are required",
        success: false,
      });
    }

    const existingRole = await RoleModal.findOne({
      where: {
        role_name,
        id: { [Op.ne]: id },
      },
    });

    if (existingRole) {
      return res.status(409).json({
        message: "Another role already exists with this name",
        success: false,
      });
    }

    const [updated] = await RoleModal.update({ role_name }, { where: { id } });

    if (updated === 0) {
      return res.status(404).json({
        message: "Role not found",
        success: false,
      });
    }

    const updatedRole = await RoleModal.findOne({ where: { id } });

    return res.status(200).json({
      message: "Role updated successfully",
      success: true,
      role: updatedRole,
    });
  } catch (err) {
    console.error("Error updating role:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

module.exports = {
  getAllRolesController,
  addRoleController,
  editRoleController,
  deleteRoleController,
};
