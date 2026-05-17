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

// 1. Define our standard base configuration for local development and Jest testing
let API = axios.create({
  baseURL: "http://localhost:3001",
});

// 2. THE PRODUCTION SHIELD: If live on GitHub Pages, swap the client with a silent mock object
if (!isDevelopment) {
  API = {
    get: () => new Promise(() => {}), // Returns a pending promise so no downstream blocks fire
    post: () => Promise.resolve({ data: {} }),
    patch: () => Promise.resolve({ data: {} }),
    delete: () => Promise.resolve({ data: {} }),
    create: function() { return this; },
    interceptors: {
      request: { use: () => {}, eject: () => {} },
      response: { use: () => {}, eject: () => {} }
    }
  };
}

export default API;