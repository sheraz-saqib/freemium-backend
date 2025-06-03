const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Create a new subcategory
router.post('/', subcategoryController.createSubCategory);

// Get all subcategories
router.get('/', subcategoryController.getAllSubCategories);

// Get a single subcategory by ID
router.get('/:id', subcategoryController.getSubCategoryById);

// Update a subcategory by ID
router.put('/:id', subcategoryController.updateSubCategory);

// Delete a subcategory by ID
router.delete('/:id', subcategoryController.deleteSubCategory);

module.exports = router;
