import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token =
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("firstName") ||
    localStorage.getItem("firstName");

  const location = useLocation();

  if (!token) {
    toast.warning("Please sign in to access your cart and complete property purchases.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
