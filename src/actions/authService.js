import axios from './api'; // Use the configured axios instance
import conf from '../conf';

const API_URL = `${conf.apiBaseUrl}/api/auth`;

const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            if (response.data.token) {
                // Store user data locally
                localStorage.setItem('user', JSON.stringify(response.data));
                // No need to manually set axios.defaults.headers since the interceptor handles it.
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to login';
        }
    },

    signup: async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, { username, email, password });
            // Immediately log in the user after signup
            const loginResponse = await authService.login(email, password);
            return loginResponse;
        } catch (error) {
            throw error.response?.data || 'Failed to register';
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        // With the interceptor, no need to manually remove header; subsequent requests won't find the token.
    }
};

export default authService;
