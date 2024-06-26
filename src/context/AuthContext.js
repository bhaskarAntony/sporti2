import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null)
    const [location, setLocation] = useState('/')

 

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const register = async (email, password) => {
    try {
      await axios.post('https://sporti-backend-2-o22y.onrender.com/api/register', { email, password });
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser,  logout, register, setIsAuthenticated, location, setLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
