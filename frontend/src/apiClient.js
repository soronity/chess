// src/apiClient.js or src/utils/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000'
});

export default apiClient;
