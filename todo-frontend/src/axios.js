// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // adapte si ton backend a un autre port
  withCredentials: true, // important pour Sanctum
});

export default api;
