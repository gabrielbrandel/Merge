// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.3.149:5000/api/',
});

export default axiosInstance;
