import axios from 'axios';

// Create Axios Instance
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to automatically add JWT Token to headers
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for handling global errors (e.g. 401 Unauthorized)
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear expired or invalid credentials
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
    return Promise.reject(error);
  }
);

// Auth API Calls
export const loginUser = async (username, password) => {
  const response = await authApi.post('/auth/login', { username, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await authApi.get('/auth/profile');
  return response.data;
};

export default authApi;
