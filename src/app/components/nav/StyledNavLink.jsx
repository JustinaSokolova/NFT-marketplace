import React from "react";
import { NavLink } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

const StyledNavLink = ({ children, to, ...props }) => {
  const theme = useTheme();

  return (
    <NavLink
      to={to}
      end
      {...props}
      style={({ isActive }) => ({
        color: isActive && theme.palette.secondary.main,
      })}
    >
      {children}
    </NavLink>
  );
};

export default StyledNavLink;
