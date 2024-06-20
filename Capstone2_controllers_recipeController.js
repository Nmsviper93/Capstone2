const Recipe = require('../models/Recipe');

// controller function to get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        // fetch all recipes from database
        const recipes = await Recipe.find();
        // return recipes in response
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// controller function to search for recipes based on a keyword
exports.searchRecipes = async (req, res) => {
    // get search keyword from query params
    const { keyword } = req.query;

    try {
        // search for recipes where name or ingredients contain the keyword, case-insensitive
        const recipes = await Recipe.find({
            $or: [
                { name: new RegExp(keyword, 'i') },
                { ingredients: new RegExp(keyword, 'i') }
            ]
        });

        // return matching recipes in response
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};