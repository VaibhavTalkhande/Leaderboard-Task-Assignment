const express = require('express');
const router = express.Router();
const {createUser,getAllUsers} = require('../controllers/usersController');

// Create a new user route
router.post('/',createUser);

// Get all users route
router.get('/', getAllUsers);

module.exports = router;
