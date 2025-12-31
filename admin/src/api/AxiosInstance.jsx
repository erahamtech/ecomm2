import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const parsedError = {
      statusCode: error?.response?.status || 500,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong",
    };

    return Promise.reject(parsedError);
  }
);

export default axiosInstance;
