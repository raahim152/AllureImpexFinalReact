import api from './api';

const messageService = {
  // Get all messages
  getMessages: async () => {
    const response = await api.get('/messages');
    return response.data;
  },

  // Get single message
  getMessage: async (id) => {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  },

  // Mark message as read
  markAsRead: async (id) => {
    const response = await api.put(`/messages/${id}/read`);
    return response.data;
  },

  // Delete message
  deleteMessage: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  }
};

export default messageService;