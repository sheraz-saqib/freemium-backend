const PricingModal = require("../models/pricing_plans.model");
const { Op } = require("sequelize");

const addPricingPlanController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Pricing plan name is required",
        success: false,
      });
    }

    const existingPlan = await PricingModal.findOne({
      where: { name },
    });

    if (existingPlan) {
      return res.status(409).json({
        message: "Pricing plan already exists with this name",
        success: false,
      });
    }

    const newPlan = await PricingModal.create({ name });

    return res.status(201).json({
      message: "Pricing plan created successfully",
      success: true,
      pricingPlan: newPlan,
    });
  } catch (err) {
    console.error("Error creating pricing plan:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Delete a pricing plan
const deletePricingPlanController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Pricing plan ID is required",
        success: false,
      });
    }

    const deleted = await PricingModal.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({
        message: "Pricing plan not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Pricing plan deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting pricing plan:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get all pricing plans
const getAllPricingPlansController = async (req, res) => {
  try {
    const allPlans = await PricingModal.findAll();

    return res.status(200).json({
      message: "All pricing plans fetched successfully",
      success: true,
      totalCount: allPlans.length,
      pricingPlans: allPlans,
    });
  } catch (err) {
    console.error("Error fetching pricing plans:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update a pricing plan
const editPricingPlanController = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({
        message: "Pricing plan ID and name are required",
        success: false,
      });
    }

    const existingPlan = await PricingModal.findOne({
      where: {
        name,
        id: { [Op.ne]: id },
      },
    });

    if (existingPlan) {
      return res.status(409).json({
        message: "Another pricing plan already exists with this name",
        success: false,
      });
    }

    const [updated] = await PricingModal.update(
      { name },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({
        message: "Pricing plan not found",
        success: false,
      });
    }

    const updatedPlan = await PricingModal.findOne({ where: { id } });

    return res.status(200).json({
      message: "Pricing plan updated successfully",
      success: true,
      pricingPlan: updatedPlan,
    });
  } catch (err) {
    console.error("Error updating pricing plan:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  getAllPricingPlansController,
  addPricingPlanController,
  editPricingPlanController,
  deletePricingPlanController,
};
