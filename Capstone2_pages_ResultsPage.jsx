import React from 'react';
import { useLocation } from 'react-router-dom';
import './Capstone2_ResultsPage.css';

const ResultsPage = () => {
    // use useLocation to access state passed via router
    const location = useLocation();
    const recipes = location.state?.recipes || [];

    return ( 
        <div className="results-container">
            <h2>Search Results</h2>
            {recipes.length === 0 ? (
                <p>No recipes found</p>
            ) : (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}>{recipe.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResultsPage;