
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthHook"; // Import your useAuth hook

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, path, redirect = "/login", redirectAdmin = "/profile" }) => {
  const { isAuth, hasPermission } = useAuth();

  if (!isAuth) {
    return <Navigate to={redirect} replace />;
  }

  if (hasPermission && hasPermission(path)) { // Check permission using hasPermission function
    return children ? children : <Outlet />; // Render authorized route content
  }

  return <Navigate to={redirectAdmin} replace />; // Redirect to unauthorized page for admins
};

export default ProtectedRoute;
