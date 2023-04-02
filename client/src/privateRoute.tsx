import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/useAuth.context";

const PrivateRoute = ({ children }: any) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
