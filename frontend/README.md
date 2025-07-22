# 🎯 Leaderboard Frontend

This is the **ReactJS frontend** for the **Leaderboard App** developed as part of the internship task for **3W Business Pvt Ltd**.

It allows users to:
- Select or add new users
- Claim random points (1–10)
- View the live-updated leaderboard

---

## 🔥 Features

- 🔍 **Paginated user list** with add-user support
- 🎯 **Claim points** via API with toast notification
- 📊 **Live leaderboard** updates using WebSocket (Socket.io)
- ⚡️ **Responsive UI** with basic styles
- 🧠 Clean React component architecture

---

## ⚙️ Tech Stack

| Library        | Usage                          |
|----------------|--------------------------------|
| React          | UI development                 |
| Axios          | API communication              |
| Socket.io-Client | Real-time updates via WebSocket |
| React Hot Toast | Notification (toast) on claim  |

---
## 📁 Frontend Folder Structure

```bash
frontend/
├── public/                      # Static assets
│   └── index.html               # HTML entry point
│
├── src/                         # Main source directory
│   ├── assets/                  # Static images or media (optional)
│   │
│   ├── components/              # React component files
│   │   ├── AddUser.jsx
│   │   ├── ClaimButton.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── TopRankerCard.jsx
│   │   └── UserSelector.jsx
│   │
│   ├── utils/                   # Utility functions and API config
│   │   └── api.js               # Axios base API setup
│   │
│   ├── App.jsx                  # Root component
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # ReactDOM entry point
│
├── .env                         # Environment config (e.g. VITE_API_URL)
├── .gitignore
├── eslint.config.js
├── index.html                   # Entry HTML file (Vite)
├── package.json
├── package-lock.json
├── vite.config.js               # Vite config
└── README.md
---
```
## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
