import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ApiContext } from "./ApiContext";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const myApi = useContext(ApiContext);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("betahouse_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const token =
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("firstName") ||
    localStorage.getItem("firstName");

  const fetchFavorites = async () => {
    const currentToken =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!currentToken || !myApi) return;

    try {
      const res = await myApi.get("/property/favorites");
      if (res.data?.favorites) {
        const favIds = res.data.favorites.map((f) => (typeof f === "object" ? f._id : f));
        setFavorites(favIds);
        localStorage.setItem("betahouse_favorites", JSON.stringify(favIds));
      }
    } catch (err) {
      // Keep local state if error
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    } else {
      setFavorites([]);
      localStorage.removeItem("betahouse_favorites");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const isFavorited = (propertyId) => {
    if (!propertyId) return false;
    return favorites.includes(propertyId.toString());
  };

  const toggleFavorite = async (property, navigate) => {
    const currentToken =
      sessionStorage.getItem("token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("firstName") ||
      localStorage.getItem("firstName");

    if (!currentToken) {
      toast.warning("Please sign in to add properties to your favorites.");
      if (navigate) navigate("/login");
      return false;
    }

    if (!property) return false;
    const propertyId = (property._id || property.id || "").toString();
    if (!propertyId) return false;

    const previouslyFavorited = favorites.includes(propertyId);

    // Optimistic UI update
    let updated;
    if (previouslyFavorited) {
      updated = favorites.filter((id) => id !== propertyId);
      toast.info("Property removed from favorites");
    } else {
      updated = [...favorites, propertyId];
      toast.success("Property added to favorites!");
    }
    setFavorites(updated);
    localStorage.setItem("betahouse_favorites", JSON.stringify(updated));

    // Call server
    try {
      if (myApi) {
        const res = await myApi.post(`/property/favorite/${propertyId}`);
        if (res.data?.favorites) {
          const serverFavs = res.data.favorites.map((f) =>
            typeof f === "object" ? f._id.toString() : f.toString()
          );
          setFavorites(serverFavs);
          localStorage.setItem("betahouse_favorites", JSON.stringify(serverFavs));
        }
      }
    } catch (err) {
      console.warn("Error syncing favorites with server:", err.message);
    }
    return true;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorited,
        toggleFavorite,
        fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
