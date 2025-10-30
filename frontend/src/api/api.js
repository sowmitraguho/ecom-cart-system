import axios from "axios";

const api = axios.create({
    baseURL: "https://mock-cart-system-backend.onrender.com/api", // backend base URL
});

export default api;
