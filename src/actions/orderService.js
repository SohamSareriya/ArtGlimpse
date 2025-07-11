import axios from './api';
import conf from '../conf';

const API_URL = `${conf.apiBaseUrl}/orders`;

const orderService = {
    createOrder: async (orderData) => {
        try {
            const response = await axios.post(API_URL, orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to create order';
        }
    },
    fetchOrders: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to fetch orders';
        }
    }
};

export default orderService;
