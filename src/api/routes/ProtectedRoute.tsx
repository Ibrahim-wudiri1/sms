// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) => {
  const { role } = useAuth();

  if (!role) return <Navigate to="/login" />;
  if (role !== allowedRole) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;