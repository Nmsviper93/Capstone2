import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
    // test to verify rendering of login form
    test('renders login form', () => {
        render(<LoginPage />);
        // check if username/password inputs & login button rendered
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    // test to verify error message on invalid input
    test('displays error message on invalid input', async () => {
        render(<LoginPage />);
        // set empty username & password
        fireEvent.change(screen.getByLabelText(/username/i), { target: {value: '' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: {value: '' } });
        fireEvent.click(screen.getByText(/login/i));

        // check if error message is displayed
        expect(await screen.findByText(/both fields are required/i)).toBeInTheDocument();
    });

    // test to verify form submission
    test('calls handleSubmit with username and password', () => {
        const mockHandleSubmit = jest.fn();
        render(<LoginPage handleSubmit={mockHandleSubmit} />);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByText(/login/i));

        expect(mockHandleSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
    });
});