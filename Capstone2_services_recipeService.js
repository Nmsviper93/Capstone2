import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes/';

// function to fetch all recipes by ID
const getRecipeById = async (id) => {
    try {
        // GET request to fetch all recipes
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    }  catch (err) {
        // log errors, throw error to be handled by the calling function
        console.error('Error fetching recipe details', err);
        throw err;
    }
};

// function to search recipes based on a query
const searchRecipes = async (query) => {
    try {
        // GET request to search for recipes
        const response = await axios.get(API_URL + 'search', {
            params: { q: query }
        });
        return response.data;
    } catch (err) {
        console.error('Error searching recipes', err);
        throw err;
    }
};

export default {
    getAllRecipes,
    searchRecipes,
    getRecipeById
};