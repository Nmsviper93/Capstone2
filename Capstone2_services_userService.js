import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = '/api/users';

let refreshTokenTimeout;

const userService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            setSession(response.data.token);
            scheduleTokenRefresh(response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    logout: () => {
        localStorage.removeItem('jwtToken');
        clearTimeout(refreshTokenTimeout);
    },
    getUserProfile: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateUserProfile: async (userId, userData) => {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, userData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// set JWT token in local storage & schedule token refresh
const setSession = (token) => {
    localStorage.setItem('jwtToken', token);
    scheduleTokenRefresh(token);
};

// get authorization headers with JWT token
const getAuthHeaders = () => {
    const token = localStorage.getItem('jwtToken');
    return { Authorization: `Bearer ${token}` };
};

// schedule token refresh before it expires
const scheduleTokenRefresh = (token) => {
    const { exp } = jwtDecode(token);
    // 1 minut before actual expiry
    const expiryTime = (exp * 1000) - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(async () => {
        try {
            const response = await axios.post(`${API_URL}/refresh-token`, { token });
            // refresh session with new token
            setSession(response.data.token);
        } catch (error) {
            // logout if refresh token fails
            userService.logout();
            console.error('Failed to refresh token', error);
        }
    }, expiryTime);
};

export default userService;