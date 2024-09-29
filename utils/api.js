import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
});

api.interceptors.request.use(async (config) => {
  const token = await window.Clerk.session.getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;