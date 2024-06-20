const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

// create new router instance
const router = express.Router();

// @route  POST request to 'api/auth/register'
// desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route  POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

module.exports = router;