import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
 
});

// Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Clear auth data on unauthorized
//       Cookies.remove('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/v1/register', data),
  login: (data) => api.post('/v1/login', data),
  logout: () => api.post('/v1/logout'),
  verifyOtp: (data) => api.post('/v1/verifyOtp', data),
  regenerateOtp: (data) => api.post('/v1/regenerateOtp', data),
  forgotPassword: (data) => api.post('/v1/forgotPassword', data),
  resetPassword: (token, data) => api.post(`/v1/resetPassword/${token}`, data),
  checkAuth: () => api.get('/v1/checkAuth'),
  googleAuth: (data) => api.post('/v1/google', data),
};

// Deployment API calls
export const deploymentAPI = {
  deploy: (data) => api.post('/api/deploy', data),
  checkNameAvailability: (data) => api.post('/api/checkAppname', data),
  getProjects: () => api.get('/api/myprojects'),
  getProjectLogs: (projectId) => api.get(`/api/logs/${projectId}`),
};

export default api;