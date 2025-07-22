const User = require('../models/User');


// Controller to get leaderboard
const getLeaderboard = async (req, res) => {
    try {
      // Parse pagination params, default to page 1, limit 10
      let { page = 1, limit = 10 } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);
  
      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;
  
      // Get total count for pagination info
      const totalUsers = await User.countDocuments();
  
      // Find users for this page
      const users = await User.find()
        .sort({ totalPoints: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      // Find all users' ids sorted by totalPoints to calculate correct rank
      const allUserIds = await User.find()
        .sort({ totalPoints: -1 })
        .select('_id')
        .lean();
  
      // Map userId to rank
      const idToRank = {};
      allUserIds.forEach((user, idx) => {
        idToRank[user._id.toString()] = idx + 1;
      });
  
      const leaderboard = users.map((user) => ({
        name: user.name,
        totalPoints: user.totalPoints,
        rank: idToRank[user._id.toString()],
        _id: user._id
      }));
  
      res.json({
        leaderboard,
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Controller to get top 3 rankers
  const getTopRankers = async (req, res) => {
    try {
      const users = await User.find().sort({ totalPoints: -1 }).limit(3);
      const topRankers = users.map((user, index) => ({
        name: user.name,
        totalPoints: user.totalPoints,
        rank: index + 1,
        _id: user._id
      }));
      res.json({ topRankers });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {
    getLeaderboard,
    getTopRankers,
  };