import axios from "axios";

const getIsDevelopment = () => {
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return true;
  }

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
  // Use local server port in dev/test, clean relative root string in production
  baseURL: isDevelopment ? "http://localhost:3001" : ""
});

export default API;