import { useState } from "react";
import { PropertiesContext } from "./ApiContext";

export const PropertiesProvider = ({ children }) => {
  const [propertiesFromApi, setPropertiesFromApi] = useState([]);

  return (
    <PropertiesContext.Provider
      value={{ propertiesFromApi, setPropertiesFromApi }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};
