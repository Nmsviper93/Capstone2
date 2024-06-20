import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePage from '../pages/ProfilePage';
import userService from '../services/userService';

jest.mock('../services/userService'); 

describe('Profile Integration Test', () => {
    test('handles profile data fetch and update', async () => {
        // mock successful fetch & update responses
        userService.getUserProfile.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' }); 
        userService.updateUserProfile.mockResolvedValue({}); 

        render(<ProfilePage />);

        // check if user name & email are displayed
        await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()); 
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument(); 

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } }); 
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } }); 
        fireEvent.click(screen.getByText(/update profile/i)); 

        await waitFor(() => expect(userService.updateUserProfile).toHaveBeenCalledWith('123', { name: 'Jane Doe', email: 'jane@example.com' }));
    });

    test('handles profile update failure', async () => {
        // mock successful fetch & update failure responses
        userService.getUserProfile.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });
        userService.updateUserProfile.mockRejectedValue(new Error('Failed to update profile'));

        render(<ProfilePage />);

        await waitFor(() => expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()); 
        expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument(); 

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } }); 
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } }); 
        fireEvent.click(screen.getByText(/update profile/i)); 

        await waitFor(() => expect(screen.getByText('Failed to update profile')).toBeInTheDocument()); 
    });
});
