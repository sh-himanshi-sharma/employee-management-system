import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getProfile } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('authUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('authToken') || null;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize and verify authentication on refresh
  useEffect(() => {
    const verifyAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const profileData = await getProfile();
          if (profileData && profileData.user) {
            setUser(profileData.user);
            localStorage.setItem('authUser', JSON.stringify(profileData.user));
          }
        } catch (err) {
          console.error('Session verification failed:', err);
          logout();
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  // Handle Login
  const login = async (username, password) => {
    setError(null);
    try {
      const data = await loginUser(username, password);
      const { token: jwtToken, user: userData } = data;

      // Update state
      setToken(jwtToken);
      setUser(userData);

      // Persist in localStorage
      localStorage.setItem('authToken', jwtToken);
      localStorage.setItem('authUser', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Handle Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
