import { useSelector, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { isAuth, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuth, navigate]);

  const hasPermission = (routePath) => {
    if (!role || !routePath) return false;
    return role.permissions.includes(routePath);
  };

  return { isAuth, hasPermission };
};
