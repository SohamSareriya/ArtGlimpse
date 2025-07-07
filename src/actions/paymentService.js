import axios from 'axios';
import conf from '../conf';

const API_BASE_URL = `${conf.apiBaseUrl}`;

export const createPaymentIntent = async (amount, currency) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/payment/create-payment-intent`,
            { amount, currency }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
