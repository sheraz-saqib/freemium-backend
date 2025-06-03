const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");

// Get all permissions
router.get("/", permissionController.getAllPermissions);

// Create a new permission
router.post("/", permissionController.createPermission);

// Update a permission
router.put("/:permissionId", permissionController.updatePermission);

// Delete a permission
router.delete("/:permissionId", permissionController.deletePermission);

module.exports = router;
