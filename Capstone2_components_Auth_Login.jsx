import React, { useState } from 'react';
import authService from 'Capstone2_authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // call login service
            const response = await authService.login(username, password);
            console.log('Login successful', response);
            // redirect to homepage after successful login
            window.location.href = '/';
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;