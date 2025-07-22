const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');
const broadcastLeaderboard = require('../utils/broadcastLeaderboard');

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
    // Broadcast updated leaderboard to all connected clients
    broadcastLeaderboard(req);

    res.json({ user, randomPoints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  claimPoints
};
