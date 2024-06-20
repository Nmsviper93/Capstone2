import React, { useEffect, useState } from 'react';
import axiosInstance from '../Capstone2_services_axiosInstance';
import './Capstone2_FavoritesPage.css';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // fetch favorite recipes when component mounts
        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('api/users/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);            
            }
        };
        fetchFavorites();
    }, []);

    const handleRemove = async (recipeId) => {
        try {
            // remove recipe from favorites
            await axiosInstance.delete(`/users/favorites/${recipeId}`);
            setFavorites(favorites.filter(fav => fav._id !== recipeId));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div className="favorites-container">
            <h1>Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <ul>
                    {favorites.map(recipe => (
                        <li key={recipe._id}>
                            <h2>{recipe.title}</h2>
                            <button onClick={() => handleRemove(recipe._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;