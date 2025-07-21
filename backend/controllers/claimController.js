const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Controller to handle claiming points
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.totalPoints += randomPoints;
    await user.save();

    const history = new ClaimHistory({
      userId,
      pointsClaimed: randomPoints,
    });
    await history.save();

    const io = req.app.get('io');
    const leaderboard = await User.find().sort({ totalPoints: -1 });

    if(io){
        io.emit('leaderboardUpdate', leaderboard.map((user, index) => ({
              name: user.name,
              totalPoints: user.totalPoints,
              rank: index + 1,
              _id: user._id
        })));
    }

    res.json({ user, randomPoints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    if (users.length === 0) return res.json([]);
    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
      _id: user._id
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  claimPoints,
  getLeaderboard,
};
