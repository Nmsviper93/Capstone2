import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/Capstone2_services_axiosInstance';
import { useHistory } from 'react-router-dom';
import './Capstone2_ProfileEditPage.css';

const ProfileEditPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        // fetch current profile information on mount
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/users/profile');
                setUsername(response.data.username);
                setEmail(response.data.email);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const validateForm = () => {
        if (!username || username.length < 3) {
            setError('Username is required and must be at least 3 characters long.');
            return false;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('A valid email is required.');
            return false;
        }
        if (password && password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }
        if (password && password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            // API call to update profile data
            await axiosInstance.put('/users/profile', { username, email, password });
            history.push('/profile');
        } catch (error) {
            setError('Profile update failed. Please try again.');
        }
    };

    return (
        <div className="profile-edit-container">
            <h1>Edit Profile</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ProfileEditPage;
