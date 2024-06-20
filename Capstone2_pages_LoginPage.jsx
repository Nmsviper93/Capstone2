import React, { useState } from 'react';
import axiosInstance from './Capstone2_services_axiosInstance';
import { useHistory } from 'react-router-dom';
import './Capstone2_LoginPage.css'

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const validateForm = () => {
        if (!username || !password) {
            setError('Username and password are required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('/api/users/login', { username, password });
            localStorage.setItem('jwtToken', response.data.token);
            history.push('/');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/login', { username, password });
            // Assuming successful login, redirect to home or another page
            history.push('/');
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;