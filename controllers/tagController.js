const TagsModal = require("../models/tags.model");
const { Op } = require("sequelize");

// Create a new tag
const addTagController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Tag name is required",
        success: false,
      });
    }

    const existingTag = await TagsModal.findOne({
      where: { name },
    });

    if (existingTag) {
      return res.status(409).json({
        message: "Tag already exists with this name",
        success: false,
      });
    }

    const newTag = await TagsModal.create({ name });

    return res.status(201).json({
      message: "Tag created successfully",
      success: true,
      tag: newTag,
    });
  } catch (err) {
    console.error("Error creating tag:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// Delete a tag
const deleteTagController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Tag ID is required",
        success: false,
      });
    }

    const deleted = await TagsModal.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Tag not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Tag deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting tag:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get all tags
const getAllTagsController = async (req, res) => {
  try {
    const allTags = await TagsModal.findAll();

    return res.status(200).json({
      message: "All tags fetched successfully",
      success: true,
      totalCount: allTags.length,
      tags: allTags,
    });
  } catch (err) {
    console.error("Error fetching tags:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update a tag
const editTagController = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({
        message: "Tag ID and name are required",
        success: false,
      });
    }

    const existingTag = await TagsModal.findOne({
      where: {
        name,
        id: { [Op.ne]: id },
      },
    });

    if (existingTag) {
      return res.status(409).json({
        message: "Another tag already exists with this name",
        success: false,
      });
    }

    const [updated] = await TagsModal.update(
      { name },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({
        message: "Tag not found",
        success: false,
      });
    }

    const updatedTag = await TagsModal.findOne({ where: { id } });

    return res.status(200).json({
      message: "Tag updated successfully",
      success: true,
      tag: updatedTag,
    });
  } catch (err) {
    console.error("Error updating tag:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

module.exports = {
  getAllTagsController,
  addTagController,
  editTagController,
  deleteTagController,
};
