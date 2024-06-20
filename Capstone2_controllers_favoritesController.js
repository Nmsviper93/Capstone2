const User = require('../models/User');

// controller function to add a recipe to user's favorites
exports.addFavorite = async (req, res) => {
    // get recipe ID from request body
    const { recipeId } = req.body;
    try {
        // find user by ID and add recipe ID to their favorites array
        const user = await User.findById(req.user.id);
        if (user.favorites.includes(recipeId)) {
            return res.status(400).json({ msg: 'Recipe already in favorites' });
        }
        user.favorites.push(recipeId);
        await user.save();
        res.json(user.favorites);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// controller function to get user's favorite recipes
exports.getFavorites = async (req, res) => {
    try {
        // find user by ID and populate their favorites array with recipe details
        const user = await User.findById(req.user.id).populate('favorites');
        res.json(user.favorites);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};