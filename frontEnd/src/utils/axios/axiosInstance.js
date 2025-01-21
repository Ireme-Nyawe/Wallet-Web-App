import axios from "axios";

// Helper function to retrieve token from localStorage
const getToken = () => {
  console.log("Token",localStorage.getItem("token"));
  return localStorage.getItem("token");
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
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
