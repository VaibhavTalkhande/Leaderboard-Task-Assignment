const User = require('../models/User');

async function broadcastLeaderboard(req) {
  try {
    const io = req.app.get('io');
    const leaderboardUsers = await User.find().sort({ totalPoints: -1 });
    const leaderboard = leaderboardUsers.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
      _id: user._id
    }));
    if (io) {
      io.emit('leaderboardUpdate', { leaderboard });
      // Emit top 3 rankers in real-time
      const topRankers = leaderboard.slice(0, 3);
      io.emit('topRankersUpdate', { topRankers });
    }
  } catch (err) {
    console.error('Error broadcasting leaderboard:', err);
  }
}

module.exports = broadcastLeaderboard;