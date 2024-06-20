import axios from 'axios';

// define base URL for backend API
const API_URL = 'http://localhost:5000/api/auth/';

// function to handle user login
const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { username, password });
        // save JWT token to localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (err) {
        console.error('Login error', err);
        throw err;
    }
};

export default {
    login,
};