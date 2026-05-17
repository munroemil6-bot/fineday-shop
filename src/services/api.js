import axios from "axios";

// Rely purely on Vite's official built-in boolean flag
const isDevelopment = import.meta.env.DEV;

const API = axios.create({
  // Point to your local json-server port during development.
  // In production, give it a placeholder or empty string so it doesn't break.
  baseURL: isDevelopment ? "http://localhost:3001" : "https://localhost-fakedomain-prevent-404.com"
});

export default API;