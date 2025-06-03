const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

// Routes for Features
router.get('/', featureController.getAllFeatures);
router.get('/:id', featureController.getFeatureById);
router.post('/', featureController.createFeature);
router.put('/:id', featureController.updateFeature);
router.delete('/:id', featureController.deleteFeature);

module.exports = router;
