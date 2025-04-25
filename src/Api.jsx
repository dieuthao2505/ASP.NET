// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7161//api', // Thay đổi theo địa chỉ backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;