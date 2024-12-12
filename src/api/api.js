import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Actualiza al puerto correcto
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;