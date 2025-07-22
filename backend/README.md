# 🛠️ Leaderboard Backend

This is the **Node.js + Express + MongoDB** backend for the **Leaderboard App**, developed for the Round 1 task of 3W Business Pvt Ltd’s internship process.

It powers:
- User creation and storage
- Random point claims with real-time leaderboard updates
- Claim history tracking
- Paginated user fetching
- WebSocket support for live updates via `Socket.io`

---

## 🚀 Tech Stack

| Tech         | Purpose                         |
|--------------|---------------------------------|
| Express.js   | HTTP server                     |
| MongoDB (Atlas) | Data persistence             |
| Mongoose     | MongoDB ODM                     |
| Socket.io    | Real-time communication         |
| dotenv       | Environment variable management |
| CORS         | API access from frontend        |
| Nodemon      | on change automatically restarts server   |

---

## 📁 Folder Structure

```bash
backend/
├── controllers/                # Modular route logic
│   ├── claimController.js
│   ├── leaderboardController.js
│   └── usersController.js
│
├── lib/                        # App-level utilities
│   └── connectDb.js
│
├── models/                     # Mongoose schemas
│   ├── ClaimHistory.js
│   └── User.js
│
├── routes/                     # Route definitions
│   ├── claim.js
│   ├── leaderboard.js
│   └── users.js
│
├── utils/                      # Generic reusable helpers
│   └── broadcastLeaderboard.js
│
├── .env                        # Environment config
├── server.js                   # Entry point
└── package.json                # Project manifest
