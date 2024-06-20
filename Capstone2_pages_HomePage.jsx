import React, { useEffect, useState } from 'react';
import recipeService from '../services/recipeService';
import './Capstone2_HomePage.css';

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect hook to fetch recipes when component mounts
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // call service to fetch all recipes
                const data = await recipeService.getAllRecipes();
                // update with fetched recipes
                setRecipes(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch recipes');
                setLoading(false);
            }
        };

        // fetch recipes when component mounts
        fetchRecipes();
        // empty dependency array to ensure only one run on mount
    }, []);

    // conditional rendering based on loading and error state
    if (loading) return<p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="home-container">
            <h2>All Vegan Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;