const { Feature } = require('../models');

// Get all features
exports.getAllFeatures = async (req, res) => {
    try {
        const features = await Feature.findAll();
        res.status(200).json({
            success: true,
            data: features,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch features',
            error: error.message,
        });
    }
};

// Get a single feature by ID
exports.getFeatureById = async (req, res) => {
    try {
        const feature = await Feature.findByPk(req.params.id);
        if (!feature) {
            return res.status(404).json({
                success: false,
                message: 'Feature not found',
            });
        }
        res.status(200).json({
            success: true,
            data: feature,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch feature',
            error: error.message,
        });
    }
};

// Create a new feature
exports.createFeature = async (req, res) => {
    try {
        const { name, description, is_premium } = req.body;
        const feature = await Feature.create({ name, description, is_premium });
        res.status(201).json({
            success: true,
            data: feature,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create feature',
            error: error.message,
        });
    }
};

// Update a feature by ID
exports.updateFeature = async (req, res) => {
    try {
        const { name, description, is_premium } = req.body;
        const feature = await Feature.findByPk(req.params.id);
        if (!feature) {
            return res.status(404).json({
                success: false,
                message: 'Feature not found',
            });
        }

        await feature.update({ name, description, is_premium });
        res.status(200).json({
            success: true,
            data: feature,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update feature',
            error: error.message,
        });
    }
};

// Delete a feature by ID
exports.deleteFeature = async (req, res) => {
    try {
        const feature = await Feature.findByPk(req.params.id);
        if (!feature) {
            return res.status(404).json({
                success: false,
                message: 'Feature not found',
            });
        }

        await feature.destroy();
        res.status(200).json({
            success: true,
            message: 'Feature deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete feature',
            error: error.message,
        });
    }
};
