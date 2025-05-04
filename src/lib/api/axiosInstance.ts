import axios from 'axios';

// TO DO
// 도메인 나오면 수정

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});

export default instance;
