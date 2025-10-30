import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      toast.error(error.response.data.message || "Server Error");
    } else if (error.request) {
      // Request was made but no response received
      toast.error("No response from server. Please try again.");
    } else {
      // Something else happened
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
