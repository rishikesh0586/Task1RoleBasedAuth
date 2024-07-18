// AuthHook.js
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import roles from "./roles";
import fetchUserRole from "./AuthService";
import React from "react";
const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const role = await fetchUserRole();
      setCurrentUserRole(role);
    };

    fetchRole();
  }, []);

  const hasPermission = (routePermissions) => {
    if (!currentUserRole || !routePermissions) return false;
    const userPermissions = roles[currentUserRole].permissions;
    return routePermissions.every((permission) => userPermissions.includes(permission));
  };

  const checkAuthorization = (routePermissions) => {
    if (!hasPermission(routePermissions)) {
      navigate("/unauthorized"); // Redirect to unauthorized page
    }
  };

  const value = { currentUserRole, hasPermission, checkAuthorization };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
