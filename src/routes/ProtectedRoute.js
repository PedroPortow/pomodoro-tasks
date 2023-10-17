import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const ProtectedRoute = () => {
  const { token } = useUserContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
