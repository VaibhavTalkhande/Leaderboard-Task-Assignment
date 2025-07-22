const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');
const connectDb = require('./lib/connectDb');
const userRoutes = require('./routes/users');
const claimRoutes = require('./routes/claim');
const leaderboardRoutes = require('./routes/leaderboard');
require('dotenv').config();

connectDb();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.Frontend_URL,
    },
})
app.set('io', io);
app.use(cors(
    {
        origin: process.env.Frontend_URL
    }
));
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/claim',claimRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

server.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
