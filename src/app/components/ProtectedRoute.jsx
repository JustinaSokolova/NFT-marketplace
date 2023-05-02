import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLogIn } from "../store/user";

function ProtectedRoute({ redirectTo, children }) {
  const location = useLocation();
  const isLogIn = useSelector(getIsLogIn());

  if (!isLogIn) {
    return (
      <Navigate
        to={redirectTo || "auth/login"}
        state={{ referrer: location }}
      />
    );
  }
  return children;
}

export default ProtectedRoute;
