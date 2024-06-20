import React, { useEffect, useState } from 'react';
import axiosInstance from './services/Capstone2_axiosInstance';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axiosInstance.get('/recipes');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
