import API from "./API";
import bundledData from "../data/db.json";

export const getProducts = async () => {
  // 1. Production Mode: Immediately return bundled data without touching any APIs
  if (!import.meta.env.DEV) {
    return bundledData.products;
  }

  // 2. Local Dev Mode: Safely try hitting your local json-server
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.warn("Local json-server not running, falling back to bundled data.");
    return bundledData.products;
  }
};