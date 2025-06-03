const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');


const {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
} = subscriptionController;

// Create a new subscription
router.post('/', createSubscription);

// Get all subscriptions
router.get('/', getAllSubscriptions);

// Get a specific subscription by ID
router.get('/:id', getSubscriptionById);

// Update a subscription
router.put('/:id', updateSubscription);

// Delete a subscription
router.delete('/:id', deleteSubscription);

module.exports = router;
