const express = require('express');
const router = express.Router();
const {
    createSearchLog,
    getAllSearchLogs,
    getSearchLogById,
    deleteSearchLog,
} = require('../controllers/searchLogController');

// Create a new search log
router.post('/', createSearchLog);

// Get all search logs
router.get('/', getAllSearchLogs);

// Get a specific search log by ID
router.get('/:id', getSearchLogById);

// Delete a search log
router.delete('/:id', deleteSearchLog);

module.exports = router;
