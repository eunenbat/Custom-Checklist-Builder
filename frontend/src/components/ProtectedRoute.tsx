import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import api from "../api";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const decoded: { exp: number } = jwtDecode(accessToken);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          // Token expired, try refresh
          const res = await api.post("/api/token/refresh/", {
            refresh: refreshToken,
          });

          if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Token check error:", err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);



  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
