import React, { useState } from 'react';
// import useHistory to programmatically navigate
import { useHistory } from 'react-router-dom';
import './Capstone2_SearchPage.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    // hook for navigation
    const history = useHistory();

    // function to validate search query
    const validateForm = () => {
        if (!query || query.length < 2) {
            // minimum query length validation
            setError('Search query must be a t least 2 characters long');
            return false;
        }
        return true;
    };



    // function to handle form submission
    const handleSubmit = (event) => {
        // prevent default form submission behavior
        event.preventDefault();
        // validate form before proceeding
        if (!validateForm()) return;

        // navigate to results page with query
        history.push(`/results?query=${query}`);
    };

    return (
        <div className="container">
            <h1>Search Recipes</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Search Query</label>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                </div>
                <button type="submit" className="button">Search</button>
            </form>
        </div>
    );
};

export default SearchPage;