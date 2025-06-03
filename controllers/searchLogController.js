const { SearchLog, User } = require('../models');

// ✅ Create a new search log
exports.createSearchLog = async (req, res) => {
    try {
        const { user_id, query } = req.body;

        // Create the search log
        const searchLog = await SearchLog.create({
            user_id: user_id || null,
            query,
        });

        res.status(201).json({
            success: true,
            message: 'Search log created successfully',
            data: searchLog,
        });
    } catch (error) {
        console.error('❌ Error creating search log:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// ✅ Get all search logs
exports.getAllSearchLogs = async (req, res) => {
    try {
        const searchLogs = await SearchLog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        res.status(200).json({
            success: true,
            count: searchLogs.length,
            data: searchLogs,
        });
    } catch (error) {
        console.error('❌ Error fetching search logs:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// ✅ Get a single search log by ID
exports.getSearchLogById = async (req, res) => {
    try {
        const { id } = req.params;

        const searchLog = await SearchLog.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'email'],
                },
            ],
        });

        if (!searchLog) {
            return res.status(404).json({
                success: false,
                message: 'Search log not found',
            });
        }

        res.status(200).json({
            success: true,
            data: searchLog,
        });
    } catch (error) {
        console.error('❌ Error fetching search log:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// ✅ Delete a search log
exports.deleteSearchLog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRows = await SearchLog.destroy({ where: { id } });

        if (!deletedRows) {
            return res.status(404).json({
                success: false,
                message: 'Search log not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Search log deleted successfully',
        });
    } catch (error) {
        console.error('❌ Error deleting search log:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
