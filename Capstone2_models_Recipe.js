const mongoose = require('mongoose');

// define schema for a recipe
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Recipe', RecipeSchema);