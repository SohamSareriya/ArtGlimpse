import axios from "axios";
import conf from "../conf";

const API_URL = `${conf.apiBaseUrl}/products`;

const productService = {
    // Fetch all products
    getProducts: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch products";
        }
    },

    // Fetch a single product by ID
    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch product";
        }
    },

    // Create a new product (Admin only)
    createProduct: async (productData) => {
        try {
            const response = await axios.post(API_URL, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to create product";
        }
    },

    // Update an existing product (Admin only)
    updateProduct: async (id, productData) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to update product";
        }
    },

    // Delete a product (Admin only)
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to delete product";
        }
    },
};

export default productService;
