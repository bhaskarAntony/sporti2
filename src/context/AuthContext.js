import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      validateToken(token).then(isValid => {
        if (isValid) {
          setIsAuthenticated(true);
          // Optionally fetch user data here
        } else {
          logout();
        }
      });
    }
  }, []); // Ensure dependencies are set if using dynamic data

  const validateToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/validateToken', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) { // Adjust based on API response
        setIsAuthenticated(true);
        setUser(response.data.user); // Update user state if token is valid
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  const login = (token, userData) => {
    Cookies.set('token', token, { expires: 7 }); // Token expires in 7 days
    setIsAuthenticated(true);
    setUser(userData);
    navigate('/');
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, validateToken, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
