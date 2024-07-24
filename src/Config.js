import axios from 'axios';

// Creating an instance of axios with a base URL from environment variables
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});


export default axiosInstance;
