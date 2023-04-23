import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const UserMenu = ({ menuId, anchorEl, isMenuOpen, handleMenuClose }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...(theme.palette.mode === "dark"
          ? { backgroundColor: theme.palette.default }
          : { backgroundColor: theme.palette.primary.light }),
      }}
    >
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link
          component={RouterLink}
          to="/user"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link>
        <Link
          component={RouterLink}
          to="/settings"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        </Link>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

UserMenu.propTypes = {
  menuId: PropTypes.string,
  anchorEl: PropTypes.any,
  onPageChange: PropTypes.func,
  isMenuOpen: PropTypes.bool,
};

export default UserMenu;
