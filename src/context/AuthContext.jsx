import { createContext, useContext, useEffect, useState } from 'react';
import API from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error al parsear datos del usuario:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const login = async (data) => {
    try {
      const res = await API.post('/auth/signin', data); //el error se da en esta línea

      const userData = {
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        roles: res.data.roles || [],
        accessToken: res.data.accessToken
      };

      localStorage.setItem('token', userData.accessToken);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (data) => {
    try {
      await API.post('/auth/signup', data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error de registro';
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
