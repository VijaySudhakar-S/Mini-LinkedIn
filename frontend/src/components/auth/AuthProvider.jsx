import React, { useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { authApi } from '../../api/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const response = await authApi.getProfile(token);
          if (response.user) {
            setUser(response.user);
          } else {
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    if (response.token) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUserProfile = async (userData) => {
    const response = await authApi.updateProfile(token, userData);
    if (response.user) {
      setUser(response.user);
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;