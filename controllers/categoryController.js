const CategoryModal = require("../models/category.model");
const { Op } = require("sequelize"); // Import Sequelize operators

const addcategoryController = async (req, res) => {
  try {
    const { name, slug, description, meta_title, meta_description } = req.body;

    if (!name || !slug || !description || !meta_title || !meta_description) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingCategory = await CategoryModal.findOne({
      where: { slug },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists with this slug",
        success: false,
      });
    }

    const newCategory = await CategoryModal.create({
      name,
      slug,
      description,
      meta_title,
      meta_description,
    });

    return res.status(201).json({
      message: "Category created successfully",
      success: true,
      category: newCategory,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Category ID is required",
        success: false,
      });
    }

    const deleted = await CategoryModal.destroy({
      where: { id },
    });

    // Check if a category was deleted
    if (deleted === 0) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const allCategories = await CategoryModal.findAll();

    return res.status(200).json({
      message: "All categories fetched successfully",
      success: true,
      totalCount: allCategories.length,
      categories: allCategories,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const editCategoryController = async (req, res) => {
  try {
    const { id } = req.body;
    const { name, slug, description, meta_title, meta_description } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Category ID is required",
        success: false,
      });
    }

    if (!name || !slug || !description || !meta_title || !meta_description) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingCategory = await CategoryModal.findOne({
      where: {
        slug,
        id: { [Op.ne]: id },
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Another category already exists with this slug",
        success: false,
      });
    }

    const [updated] = await CategoryModal.update(
      { name, slug, description, meta_title, meta_description },
      { where: { id } }
    );

    // Check if a category was updated
    if (updated === 0) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    const updatedCategory = await CategoryModal.findOne({ where: { id } });

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      category: updatedCategory,
    });
  } catch (err) {
    console.error("Error updating category:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

module.exports = {
  getAllCategoryController,
  addcategoryController,
  editCategoryController,
  deleteCategoryController,
};
