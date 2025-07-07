import axios from './api'; // use the configured axios instance
import conf from '../conf';

const API_URL = `${conf.apiBaseUrl}/api/user`;

const userService = {
    getProfile: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/profile`, { params: { userId } });
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to get profile';
        }
    },

    updateProfile: async (userId, profileData) => {
        try {
            const response = await axios.put(`${API_URL}/profile`, profileData, { params: { userId } });
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to update profile';
        }
    },

    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/profile`, { params: { userId } });
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to delete user';
        }
    }
};

export default userService;
