import React from "react";

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AuthWrapper from "../components/pages/Authentication/AuthWrapper";
import { getIsLogIn } from "../store/user";

const Auth = () => {
  const isLogIn = useSelector(getIsLogIn());

  if (isLogIn) {
    return <Navigate to="/" />;
  }

  return (
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
  );
};

export default Auth;
