import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_HOST || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
