const express = require('express');
const { addFavorite, getFavorites } = require('../controllers/favoritesController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// @route  POST to api/favorites
// @desc   Add recipe to favorites
// access  Private
router.post('/', auth, addFavorite);

// @route  GET to api/favorites
// @desc  Get user's favorite recipes
// @access Private
router.get('/', auth, getFavorites);

module.exports = router;