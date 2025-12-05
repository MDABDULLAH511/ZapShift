import React from "react";
import useAuth from "../Hooks/UseAuth";
import LoadingSipper from "../Components/LoadingSpinner/LoadingSipper";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <LoadingSipper />;
  }
  if (role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderRoute;
