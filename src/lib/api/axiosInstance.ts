import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
