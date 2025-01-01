import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

interface RequireAuthProps {
  allowedRoles?: number[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.roles?.some((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
