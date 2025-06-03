const { Subscription, User, PlanFeature , Feature } = require('../models');

// ✅ Create a new subscription
exports.createSubscription = async (req, res) => {
    try {
        const { user_id, plan_name, status, start_date, end_date, payment_provider, payment_id } = req.body;

        const subscription = await Subscription.create({
            user_id,
            plan_name,
            status: status || 'active',
            start_date: start_date || new Date(),
            end_date,
            payment_provider,
            payment_id,
        });

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription,
        });
    } catch (error) {
        console.error('❌ Error creating subscription:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: PlanFeature,
                    as: 'plan_features',
                    include: [
                        {
                            model: Feature,
                            as: 'feature',
                            attributes: ['id', 'name', 'description'],
                        },
                    ],
                },
            ],
            order: [['created_at', 'DESC']],
        });


        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions,
        });
    } catch (error) {
        console.error('❌ Error fetching subscriptions:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// ✅ Get a single subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const { id } = req.params;

        const subscription = await Subscription.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: PlanFeature,
                    attributes: ['id', 'name', 'description'],
                }
            ],
        });

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found',
            });
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        console.error('❌ Error fetching subscription:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// ✅ Update a subscription
exports.updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const subscription = await Subscription.findByPk(id);

        if (!subscription) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found',
            });
        }

        await subscription.update(updatedData);

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: subscription,
        });
    } catch (error) {
        console.error('❌ Error updating subscription:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// ✅ Delete a subscription
exports.deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await Subscription.destroy({ where: { id } });

        if (!deletedRows) {
            return res.status(404).json({
                success: false,
                message: 'Subscription not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully',
        });
    } catch (error) {
        console.error('❌ Error deleting subscription:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
