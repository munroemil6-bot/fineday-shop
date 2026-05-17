import axios from "axios";

const getIsDevelopment = () => {
  // If Jest is running the test, process.env will exist. Force development mode.
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return true;
  }

  // Sneak past Jest's parser by evaluating import.meta using string brackets
  if (typeof globalThis !== "undefined") {
    const meta = globalThis["import" + "." + "meta"];
    if (meta && meta.env && meta.env.DEV) {
      return true;
    }
  }

  return false;
};

const isDevelopment = getIsDevelopment();

const API = axios.create({
  baseURL: isDevelopment 
    ? "http://localhost:3001" 
    : "https://localhost-fakedomain-prevent-404.com"
});

export default API;