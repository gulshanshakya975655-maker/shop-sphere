import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Har request ke saath auto token bhej do agar user logged in hai
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;