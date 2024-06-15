import { getSession } from "@/helpers/helpers";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASEURL || "http://localhost:8000",
  timeout: 30000,
  timeoutErrorMessage: "Request timed out",
});

axiosInstance.interceptors.request.use(
  async function (config) {
    // console.log(config)
    // const token = sessionStorage.getItem("token");
    const token = await getSession()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
