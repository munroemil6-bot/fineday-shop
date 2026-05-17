import axios from "axios";

// 1. Safe environment evaluation helper that won't trip up Jest's compiler
const getIsDevelopment = () => {
  // If Jest is running this test, treat it as development or look at node_env
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return true; 
  }
  
  // Safely grab Vite's variable using an optional chain fallback strategy
  try {
    return !!(import.meta && import.meta.env && import.meta.env.DEV);
  } catch (e) {
    return false;
  }
};

const isDevelopment = getIsDevelopment();

const API = axios.create({
  // Point to local server in development/test, or fallback domain in production
  baseURL: isDevelopment 
    ? "http://localhost:3001" 
    : "https://localhost-fakedomain-prevent-404.com"
});

export default API;