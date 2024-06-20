import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePage from './ProfilePage';
import userService from '../services/userService';

jest.mock('../services/userService');

describe('ProfilePage', () => {
    // test to verify rendering of loading spinner
    test('renders loading spinner intially', () => {
        render(<ProfilePage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // test to verify rendering user profile data
    test('displays user profile data', async () => {
        userService.getUserProfile.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        render(<ProfilePage />);
        // check if user name & email are displayed
        await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument());
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    });

    // test to verify error message failed data fetch
    test('displays error message on failed fetch', async () => {
        userService.getUserProfile.mockRejectedValue(new Error('Failed to fetch user profile'));
        render(<ProfilePage />);
        await waitFor(() => expect(screen.getByText('Failed to fetch user profile')).toBeInTheDocument());
    });

    // test to verify user profile update
    test('updates user profile', async () => {
        // mock API response then update response
        userService.getUserProfile.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        userService.updateUserProfile.mockResolvedValue({});
        render(<ProfilePage />);
        await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument());

        // change user name & email, click update profile button
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
        fireEvent.click(screen.getByText(/update profile/i));

        // check if update API is called with correct argument
        await waitFor(() => expect(userService.updateUserProfile).toHaveBeenCalledWith('123', { name: 'Jane Doe', email: 'jane@example.com' }));
    });

    // test to verify error message on failed profile update
    test('displays error message on failed update', async () => {
        userService.getUserProfile.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        userService.updateUserProfile.mockRejectedValue(new Error('Failed to update profile'));
        render(<ProfilePage />);
        await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: {value: 'jane@example.com' } });
        fireEvent.click(screen.getByText(/update profile/i));

        await waitFor(() => expect(screen.getByText('Failed to update profile')).toBeInTheDocument());
    });
});