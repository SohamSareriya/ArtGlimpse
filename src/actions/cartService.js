import axios from './api';
import conf from '../conf';

const API_URL = `${conf.apiBaseUrl}/cart`;

const cartService = {
    getCart: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch cart";
        }
    },

    addProductToCart: async (cartData) => {
        try {
            const response = await axios.post(API_URL, cartData);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to add product to cart";
        }
    },

    updateProductQuantity: async (userId, productId, quantity) => {
        try {
            const response = await axios.put(`${API_URL}/${userId}/${productId}`, { quantity });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to update product quantity";
        }
    },

    removeProductFromCart: async (userId, productId) => {
        try {
            const response = await axios.delete(`${API_URL}/${userId}/${productId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to remove product from cart";
        }
    },
};

export default cartService;
