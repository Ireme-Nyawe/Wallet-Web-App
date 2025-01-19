import axios from "axios";

const getToken = () => {
    return localStorage.getItem("token");
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:2500',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

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
)

export default axiosInstance;