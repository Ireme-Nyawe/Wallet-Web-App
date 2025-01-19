import axios from "axios";

// Helper function to retrieve token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Debugging: Log the baseURL to verify it's being set correctly
console.log("Backend URL:", import.meta.env.VITE_REACT_APP_BACKEND_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL, // Ensure the variable is prefixed with VITE_
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
