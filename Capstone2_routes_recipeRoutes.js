const express = require('express');
const { getAllRecipes, searchRecipes } = require('../controllers/recipeController');

const router = express.Router();

// @route  GET request to api/recipes
// @desc  Get all recipes
// @access Public
router.get('/', getAllRecipes);

// @route GET request to api/recipes/search
// @desc  Search for recipes
// @access  Public
router.get('/search', searchRecipes);

module.exports = router;