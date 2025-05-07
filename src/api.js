import axios from 'axios';

const API = axios.create({
  baseURL: 'https://lab7-back.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.config.url, error.response?.data);
    return Promise.reject(error);
  }
);

export default API;