import api from './api';
import axios from 'axios';

const productService = {
  // Get all products
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.featured) params.append('featured', filters.featured);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = `/products${queryString ? `?${queryString}` : ''}`;
    
    return await api.get(url);
  },

  // Get single product
  getProduct : async (queryParams = '') => {
  try {
    const response = await axios.get(`/api/products${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
},

  // Create product (admin only)
  createProduct: async (productData) => {
    return await api.post('/products', productData);
  },

  // Update product (admin only)
  updateProduct: async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
  },

  // Delete product (admin only)
  deleteProduct: async (id) => {
    return await api.delete(`/products/${id}`);
  },

  // Add image to product
  addProductImage: async (productId, imageData) => {
    return await api.post(`/products/${productId}/images`, imageData);
  },

  // Remove image from product
  removeProductImage: async (productId, imageId) => {
    return await api.delete(`/products/${productId}/images/${imageId}`);
  }
};

export default productService;