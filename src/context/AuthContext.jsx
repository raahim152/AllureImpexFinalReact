import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import { toast } from 'react-hot-toast';
import userService from '../services/userService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkAuth = async () => {
    const token = authService.getToken();
    if (token) {
      try {
        const response = await userService.getProfile();
        setUser(response.data);
      } catch (error) {
        // Token might be expired, clear it
        authService.logout();
      }
    }
    setLoading(false);
  };
  
  checkAuth();
}, []);


  const login = async (email, password) => {
  try {
    setLoading(true);
    const response = await authService.login({ email, password });
    
    if (response.success) {
      setUser(response.user);
      toast.success('Login successful!');
      return { success: true, data: response };
    } else {
      // Handle API response error
      const errorMessage = response.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      return { success: false, error: { message: errorMessage } };
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Better error messages based on error type
    let errorMessage = 'Login failed. Please try again.';
    
    if (error.message?.includes('Network Error')) {
      errorMessage = 'Network error. Please check your connection.';
    } else if (error.message?.includes('401')) {
      errorMessage = 'Invalid email or password.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    toast.error(errorMessage);
    return { success: false, error: { message: errorMessage } };
  } finally {
    setLoading(false);
  }
};
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      toast.success('Registration successful!');
      return { success: true, data: response };
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


//export { AuthProvider, useAuth };