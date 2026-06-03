import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-web-app-d6uc.onrender.com/api"
});

// Attach token automatically for every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;