const db = require('../models');
const SubCategory = db.SubCategory;
const Category = db.Category;

// Create a new subcategory
exports.createSubCategory = async (req, res) => {
  try {
    const { name, category_id, description } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({
        success: false,
        message: 'Name and category_id are required',
      });
    }

    // Ensure the parent category exists
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Parent category not found',
      });
    }

    const subcategory = await SubCategory.create({ name, category_id, description });

    res.status(201).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.error('❌ Error creating subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get all subcategories with parent categories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.findAll({
      include: [{ model: Category, as: 'category' }],
    });

    res.status(200).json({
      success: true,
      count: subcategories.length,
      data: subcategories,
    });
  } catch (error) {
    console.error('❌ Error fetching subcategories:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get a single subcategory by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await SubCategory.findByPk(id, {
      include: [{ model: Category, as: 'category' }],
    });

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'SubCategory not found',
      });
    }

    res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.error('❌ Error fetching subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update a subcategory by ID
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category_id } = req.body;

    const subcategory = await SubCategory.findByPk(id);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'SubCategory not found',
      });
    }

    if (category_id) {
      // Ensure the new parent category exists
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Parent category not found',
        });
      }
      subcategory.category_id = category_id;
    }

    subcategory.name = name || subcategory.name;
    subcategory.description = description || subcategory.description;

    await subcategory.save();

    res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    console.error('❌ Error updating subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete a subcategory by ID
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await SubCategory.findByPk(id);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: 'SubCategory not found',
      });
    }

    await subcategory.destroy();

    res.status(200).json({
      success: true,
      message: 'SubCategory deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
