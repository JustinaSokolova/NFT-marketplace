import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ListItemIcon from "@mui/material/ListItemIcon";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const UserMenu = ({ menuId, anchorEl, isMenuOpen, handleMenuClose }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...(theme.palette.mode === "dark"
          ? { backgroundColor: theme.palette.background[900] }
          : { backgroundColor: theme.palette.background.paper }),
      }}
    >
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link
          component={RouterLink}
          to="/user"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          <MenuItem onClick={handleMenuClose}>
            {" "}
            <ListItemIcon>
              <PermIdentityIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Link
          component={RouterLink}
          to="/settings"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          <MenuItem onClick={handleMenuClose}>
            {" "}
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          <MenuItem onClick={handleMenuClose}>
            {" "}
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Log Out
          </MenuItem>
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
