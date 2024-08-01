import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

api.interceptors.request.use(async (config) => {
  const token = await window.Clerk.session.getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;