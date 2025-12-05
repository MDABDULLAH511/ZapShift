import React from "react";
import useAuth from "../Hooks/UseAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden/Forbidden";
import LoadingSipper from "../Components/LoadingSpinner/LoadingSipper";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSipper />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
