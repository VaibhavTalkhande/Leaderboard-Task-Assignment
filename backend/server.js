const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./lib/connectDb');
const userRoutes = require('./routes/users');
const claimRoutes = require('./routes/claim');

require('dotenv').config();

connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/claim',claimRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
