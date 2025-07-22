const express = require('express');
const router = express.Router();
const { claimPoints, getLeaderboard, getTopRankers } = require('../controllers/claimController');

// Route to claim points for a user
router.post('/:userId', claimPoints);

module.exports = router;
