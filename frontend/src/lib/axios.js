import axios from "axios";

const DEV = import.meta.env.VITE_ENV;

export const axiosInstance = axios.create({
  baseURL: `${
    DEV === "development"
      ? "http://localhost:5001/api/"
      : "https://moodie.onrender.com/api/"
  }`,
  withCredentials: true,
});
