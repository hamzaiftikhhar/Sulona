// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Optional: Add request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Axios Request:', config);
    return config;
  },
  (error) => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', response);
    return response;
  },
  (error) => {
    console.error('Axios Response Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;