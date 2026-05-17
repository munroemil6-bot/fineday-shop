import axios from "axios";

const isDevelopment = 
  (typeof process !== "undefined" && process.env.NODE_ENV === "test") ||
  (typeof window !== "undefined" && window.location.hostname === "localhost") ||
  (typeof globalThis !== "undefined" && globalThis['import' + '']?.['meta']?.env?.DEV);

const API = axios.create({
  baseURL: isDevelopment ? "http://localhost:3001" : "/"
});

export default API;