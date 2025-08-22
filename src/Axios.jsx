import axios from "axios";
import { ApiContext } from "./ApiContext";

export function ApiProvider({ children }) {
  // Create one axios instance for the entire app
  const propertyApi = axios.create({
    baseURL: "https://betahouse-techstudio-server-1.onrender.com/api/v1/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Automatically attach token from localStorage, if present
  propertyApi.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <ApiContext.Provider value={propertyApi}>{children}</ApiContext.Provider>
  );
}
