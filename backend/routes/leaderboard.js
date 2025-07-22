const express = require('express');
const router = express.Router();
const {getLeaderboard, getTopRankers } = require('../controllers/leaderboardController');

// Route to get the leaderboard
router.get('/', getLeaderboard);

// Route to get the top 3 rankers
router.get('/top-rankers', getTopRankers);

module.exports = router;