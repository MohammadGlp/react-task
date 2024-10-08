import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  withCredentials: false,
});

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
};
