import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

// Fetch all customers
export const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`);
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};

// Add or update a product
export const saveProduct = async (product) => {
    try {
        if (product.id) {
            // Update existing product
            const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, product);
            return response.data;
        } else {
            // Add new product
            const response = await axios.post(`${API_BASE_URL}/products`, product);
            return response.data;
        }
    } catch (error) {
        console.error('Error saving product:', error);
        throw error;
    }
};




