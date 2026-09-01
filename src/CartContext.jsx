import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("betahouse_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("betahouse_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (property) => {
    if (!property) return false;

    const token =
      sessionStorage.getItem("token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("firstName") ||
      localStorage.getItem("firstName");

    if (!token) {
      toast.warning("Please sign in to add properties to your cart or make reservations.");
      return false;
    }

    const propertyId = property._id || property.id;
    const exists = cart.find((item) => (item._id || item.id) === propertyId);
    if (exists) {
      toast.info(`"${property.title || 'Property'}" is already in your cart!`);
      return false;
    }
    setCart((prev) => [...prev, property]);
    toast.success(`"${property.title || 'Property'}" added to your cart!`);
    return true;
  };

  const removeFromCart = (propertyId) => {
    setCart((prev) => prev.filter((item) => (item._id || item.id) !== propertyId));
    toast.info("Property removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const val = item.amount !== undefined && item.amount !== null ? item.amount : item.price;
      const numericPrice = typeof val === "number"
        ? val
        : parseFloat(String(val || "").replace(/[^0-9.]/g, "")) || 0;
      return acc + numericPrice;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
