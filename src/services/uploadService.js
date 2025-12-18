import api from './api';

const uploadService = {
  // Upload single file to Cloudinary
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return await api.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Upload multiple files
  uploadMultipleFiles: async (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    
    return await api.post('/uploads/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete file from Cloudinary
  deleteFile: async (publicId) => {
    return await api.delete(`/uploads/${publicId}`);
  },

  // Get Cloudinary image URL with transformations
  // Update the getOptimizedImageUrl function:
getOptimizedImageUrl: (url, options = {}) => {
  if (!url) return '';
  
  const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;
  
  // If it's already a Cloudinary URL, add transformations
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    // Check if it already has transformations
    if (url.includes('/upload/') && url.includes('/upload/v')) {
      // Already has version, don't modify
      return url;
    }
    
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      let transformations = [];
      if (width) transformations.push(`w_${width}`);
      if (height) transformations.push(`h_${height}`);
      transformations.push('c_fill');
      if (quality) transformations.push(`q_${quality}`);
      if (format && format !== 'auto') transformations.push(`f_${format}`);
      
      const transformString = transformations.join(',');
      return `${parts[0]}/upload/${transformString}/${parts[1]}`;
    }
  }
  
  return url;
},

  // Get thumbnail URL
  getThumbnailUrl: (url) => {
    return uploadService.getOptimizedImageUrl(url, { width: 300, height: 200 });
  },

  // Get product display URL
  getProductImageUrl: (url) => {
    return uploadService.getOptimizedImageUrl(url, { width: 800, height: 600 });
  }
};

export default uploadService;