import React from "react";
import useAuth from "../Hooks/UseAuth";
import LoadingSipper from "../Components/LoadingSpinner/LoadingSipper";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSipper />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoutes;
