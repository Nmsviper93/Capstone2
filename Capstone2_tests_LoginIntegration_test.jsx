import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import userService from '../services/userService';

jest.mock('../services/userService');

describe('Login Integration Test', () => {
    test('handles login flow successfully', async () => {
        userService.login.mockResolvedValue({ username: 'testuser' });

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/login/i));

        // check if login API is called
        await waitFor(() => expect(userService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'password' }));
    });

    test('handles login failure', async () => {
        userService.login.mockRejectedValue(new Error('Invalid credentials'));

        render(
            <Router>
                <LoginPage />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText(/login/i));

        await waitFor(() => expect(userService.login).toHaveBeenCalledWith({ username: 'wronguser', password: 'wrongpassword' }));

        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
});