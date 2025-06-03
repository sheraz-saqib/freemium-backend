const db = require('../models');
const Tool = db.Tool;
const SubCategory = db.SubCategory;
const Category = db.Category;
const ToolTag = db.ToolTags;
const Tag = db.Tag;
const ToolImage = db.ToolImage;

// Create a new tool
exports.createTool = async (req, res) => {
    try {
        const {
            name, slug, description, image_url, website_url, pricing_model,
            category_id, subcategory_id, submitted_by, social_links,
            meta_title, meta_description
        } = req.body;

        // Validate required fields
        if (!name || !subcategory_id || !slug || !description || !image_url || pricing_model) {
            return res.status(400).json({
                success: false,
                message: 'Missing required field',
            });
        }

        // Ensure the parent subcategory exists
        const subCategory = await SubCategory.findByPk(subcategory_id, {
            include: [{ model: Category, as: 'category' }],
        });

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: 'SubCategory not found',
            });
        }

        // Create the tool
        const tool = await Tool.create({
            name,
            slug,
            description,
            image_url,
            website_url,
            pricing_model,
            category_id,
            subcategory_id,
            submitted_by,
            social_links: JSON.stringify(social_links),
            meta_title,
            meta_description,
        });

        if (tag_ids && tag_ids.length > 0) {
            await tool.setTags(tag_ids);
        }

        if (image_ids && image_ids.length > 0) {
            await tool.setImages(image_ids);
        }

        res.status(201).json({
            success: true,
            message: 'Tool created successfully',
            data: tool,
        });

    } catch (error) {
        console.error('❌ Error creating tool:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Get all tools with categories, subcategories, and tags
exports.getAllTools = async (req, res) => {
    try {
        const tools = await Tool.findAll({
            include: [
                { model: Category, as: 'category' },
                { model: SubCategory, as: 'subcategory' },
                { model: ToolImage, as: 'images' },
                { model: Tag, as: 'tags' }
            ]
        });

        res.status(200).json({
            success: true,
            count: tools.length,
            data: tools,
        });

    } catch (error) {
        console.error('❌ Error fetching tools:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Get a single tool by ID
exports.getToolById = async (req, res) => {
    try {
        const { id } = req.params;
        const tool = await Tool.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: SubCategory, as: 'subcategory' },
                { model: ToolImage, as: 'images' },
                { model: Tag, as: 'tags' }
            ]
        });

        if (!tool) {
            return res.status(404).json({
                success: false,
                message: 'Tool not found',
            });
        }

        res.status(200).json({
            success: true,
            data: tool,
        });

    } catch (error) {
        console.error('❌ Error fetching tool:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Update a tool by ID
exports.updateTool = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name, slug, description, image_url, website_url, pricing_model,
            category_id, subcategory_id, submitted_by, social_links,
            meta_title, meta_description
        } = req.body;

        // Validate required fields
        if (!name || !subcategory_id || !slug || !description || !image_url) {
            return res.status(400).json({
                success: false,
                message: 'Fields are required',
            });
        }

        // Ensure the parent subcategory exists
        const subCategory = await SubCategory.findByPk(subcategory_id, {
            include: [{ model: Category, as: 'category' }],
        });

        if (!subCategory) {
            return res.status(404).json({
                success: false,
                message: 'SubCategory not found',
            });
        }

        const tool = await Tool.findByPk(id);

        if (!tool) {
            return res.status(404).json({
                success: false,
                message: 'Tool not found',
            });
        }

        await tool.update({
            name,
            slug,
            description,
            image_url,
            website_url,
            pricing_model,
            category_id,
            subcategory_id,
            submitted_by,
            social_links: JSON.stringify(social_links),
            meta_title,
            meta_description,
        });

        if (tag_ids && tag_ids.length > 0) {
            await tool.setTags(tag_ids);
        }
        
        if (image_ids && image_ids.length > 0) {
            await tool.setImages(image_ids);
        }


        res.status(200).json({
            success: true,
            message: 'Tool updated successfully',
            data: tool,
        });

    } catch (error) {
        console.error('❌ Error updating tool:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// Delete a tool by ID
exports.deleteTool = async (req, res) => {
    try {
        const { id } = req.params;

        const tool = await Tool.findByPk(id);

        if (!tool) {
            return res.status(404).json({
                success: false,
                message: 'Tool not found',
            });
        }

        await tool.destroy();

        res.status(200).json({
            success: true,
            message: 'Tool deleted successfully',
        });

    } catch (error) {
        console.error('❌ Error deleting tool:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
