import api from './api';

const userService = {
  // Get all users (admin only)
  getUsers: async () => {
    return await api.get('/users');
  },

  // Get single user
  getUser: async (id) => {
    return await api.get(`/users/${id}`);
  },

  // Update user
  updateUser: async (id, userData) => {
    return await api.put(`/users/${id}`, userData);
  },

  // Delete user (admin only)
  deleteUser: async (id) => {
    return await api.delete(`/users/${id}`);
  },

  // Create admin (development only)
  createAdmin: async (userData) => {
    return await api.post('/users/create-admin', userData);
  },

  // Get current user profile
  getProfile: async () => {
    return await api.get('/auth/me');
  }
};

export default userService;