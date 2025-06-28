const ToolModal = require('../models/tools.model');
const { Op } = require("sequelize");

// Add Tool
const addToolController = async (req, res) => {
  try {
    const {
      name,
      sub_category_id,
      rating,
      comment,
      description,
      age,
      visit_link,
      pricing_plan_id,
      tags,
      release_date,
      github,
      youtube,
      X,
      facebook,
      instagram,
    } = req.body;

    if (
      !name ||
      !sub_category_id ||
      !rating ||
      !description ||
      visit_link === undefined ||
      !pricing_plan_id ||
      !tags
    ) {
      return res.status(400).json({
        message: "Required fields missing",
        success: false,
      });
    }

    const existingTool = await ToolModal.findOne({ where: { name } });

    if (existingTool) {
      return res.status(409).json({
        message: "Tool already exists with this name",
        success: false,
      });
    }

    const newTool = await ToolModal.create({
      name,
      sub_category_id,
      rating,
      comment,
      description,
      age,
      visit_link,
      pricing_plan_id,
      tags,
      release_date,
      github,
      youtube,
      X,
      facebook,
      instagram,
    });

    return res.status(201).json({
      message: "Tool created successfully",
      success: true,
      tool: newTool,
    });
  } catch (err) {
    console.error("Error creating tool:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Delete Tool
const deleteToolController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Tool ID is required",
        success: false,
      });
    }

    const deleted = await ToolModal.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Tool not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Tool deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting tool:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get All Tools
const getAllToolController = async (req, res) => {
  try {
    const allTools = await ToolModal.findAll();

    return res.status(200).json({
      message: "All tools fetched successfully",
      success: true,
      totalCount: allTools.length,
      tools: allTools,
    });
  } catch (err) {
    console.error("Error fetching tools:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Edit Tool
const editToolController = async (req, res) => {
  try {
    const {
      id,
      name,
      sub_category_id,
      rating,
      comment,
      description,
      age,
      visit_link,
      pricing_plan_id,
      tags,
      release_date,
      github,
      youtube,
      X,
      facebook,
      instagram,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Tool ID is required",
        success: false,
      });
    }

    if (
      !name ||
      !sub_category_id ||
      !rating ||
      !description ||
      visit_link === undefined ||
      !pricing_plan_id ||
      !tags
    ) {
      return res.status(400).json({
        message: "Required fields missing",
        success: false,
      });
    }

    const existingTool = await ToolModal.findOne({
      where: {
        name,
        id: { [Op.ne]: id }, // Check for duplicate name excluding current tool
      },
    });

    if (existingTool) {
      return res.status(409).json({
        message: "Another tool already exists with this name",
        success: false,
      });
    }

    const [updated] = await ToolModal.update(
      {
        name,
        sub_category_id,
        rating,
        comment,
        description,
        age,
        visit_link,
        pricing_plan_id,
        tags,
        release_date,
        github,
        youtube,
        X,
        facebook,
        instagram,
      },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({
        message: "Tool not found",
        success: false,
      });
    }

    const updatedTool = await ToolModal.findOne({ where: { id } });

    return res.status(200).json({
      message: "Tool updated successfully",
      success: true,
      tool: updatedTool,
    });
  } catch (err) {
    console.error("Error updating tool:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  addToolController,
  deleteToolController,
  getAllToolController,
  editToolController,
};
