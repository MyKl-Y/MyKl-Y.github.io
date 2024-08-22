import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://student-dashboard.onrender.com:5050",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;