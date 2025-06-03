const db = require('../models');
const Role = db.Role;

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Role name is required',
      });
    }

    const role = await Role.create({ name });

    res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error) {
    console.error('❌ Error creating role:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles,
    });
  } catch (error) {
    console.error('❌ Error fetching roles:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const role = await Role.findByPk(id);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    console.error('❌ Error fetching role:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    role.name = name || role.name;

    await role.save();

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error) {
    console.error('❌ Error updating role:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    await role.destroy();

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting role:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
