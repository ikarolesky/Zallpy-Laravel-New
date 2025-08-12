import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL + '/api/v1'
    : '/api/v1',
  headers: {
    Accept: 'application/json',
  },
});
export default api;
