const CategoryModal = require("../models/category.model");

const categoryController = async (req, res) => {
  try {
    const { name, slug, description, meta_title, meta_description } = req.body;

    if (!name || !slug || !description || !meta_title || !meta_description) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingCategory = await CategoryModal.findOne({
      where: {
        slug: slug,
      },
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

    // console.log("new category: ", newCategory)

    return res.status(201).json({
      message: "Category created successfully",
      success: true,
      category: newCategory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const editCategoryController = async (req,res) => {
    
};

const deleteCategoryController = async (req,res) => {};

module.exports = {
  categoryController,
  editCategoryController,
  deleteCategoryController,
};
