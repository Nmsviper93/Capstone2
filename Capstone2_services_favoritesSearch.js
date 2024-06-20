import axios from 'axios';

const API_URL = 'http://localhost:5000/api/favorites/';

// function to fetch all favorite recipes
const getFavorites = async (userId) => {
    try {
        // GET request to fetch favorite recipes for given user
        const response = await axios.get(API_URL, {
            params: { userId }
        });
        // return list of favorite recipes
        return response.data;
    } catch (err) {
        console.error('Error fetching favorite recipes', err);
        throw err;
    }
};

// function to add recipe to favorites
const addFavorite = async (userId, recipeId) => {
    try {
        // make POST request to add recipe to favorites for given user
        const response = await axios.post(API_URL, {
            userId,
            recipeId
        });
        // return updated list of favorites
        return response.data;
    } catch (err) {
        console.error('Error adding favorite recipe', err);
        throw err;
    }
};

// function to remove a recipe from favorites
const removeFavorite = async (userId, recipeId) => {
    try {
        // make DELETE request to remove recipe from favorites for given user
        const response = await axios.delete(API_URL, {
            data: { userId, recipeId }
        });
        // return updated list of favorites
        return response.data;
    } catch (err) {
        console.error('Error removing favorite recipe', err);
        throw err;
    }
};

export default {
    getFavorites,
    addFavorite,
    removeFavorite
};