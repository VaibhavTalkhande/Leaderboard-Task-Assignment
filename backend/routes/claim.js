const express = require('express');
const router = express.Router();
const { claimPoints, getLeaderboard } = require('../controllers/claimController');

// Route to claim points for a user
router.post('/:userId', claimPoints);

// Route to get the leaderboard
router.get('/leaderboard', getLeaderboard);

module.exports = router;
