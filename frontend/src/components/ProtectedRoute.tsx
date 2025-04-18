import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  // if there is an error with access(), catch it and set isAuthenticated to false
  useEffect(() => {
    access().catch(() => setIsAuthenticated(false));
  }, []);

  const refresh = async () => {
    try {
      const response = await fetch("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const access = async () => {
    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    }
  };
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
