import API from "./API";
import bundledData from "../data/db.json";

export const getProducts = async () => {
  try {
    // 1. Local Dev: Try to get real-time updates from json-server
    if (import.meta.env.DEV) {
      const response = await API.get("/products");
      return response.data;
    }
  } catch (error) {
    console.warn("Local json-server not running, falling back to bundled data.");
  }

  // 2. Production (or local fallback): Serve data straight out of your src folder
  return bundledData.products;
};