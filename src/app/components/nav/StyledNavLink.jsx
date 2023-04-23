import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

import Link from "@mui/material/Link";

const StyledNavLink = ({ children, to, ...props }) => {
  const location = useLocation();
  // const match = useMatch(to);
  // console.log("match", match);
  // console.log("location", location);

  // const setActive = ({ isActive }) => (isActive ? " Mui-selected" : "");
  // useEffect(() => {
  //   setActive();
  // }, []);

  return (
    <Link
      button
      to={to}
      component={RouterLink}
      color="inherit"
      underline="none"
      rel="noopener"
      {...props}
      selected={to === location.pathname}
      // className={to === location.pathname ? "selected" : ""}
    >
      {children}
    </Link>
  );
};

export default StyledNavLink;
