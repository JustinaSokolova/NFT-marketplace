import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SailingIcon from "@mui/icons-material/Sailing";
import FaceIcon from "@mui/icons-material/Face";
import PublicIcon from "@mui/icons-material/Public";

import StyledNavLink from "./StyledNavLink";

const ListItems = () => {
  const location = useLocation();
  return (
    <>
      <List>
        <ListItem label="dashboard">
          <ListItemButton>
            {
              // selected вешать сюда - ListItemButton
            }
            <ListItemIcon sx={{ minWidth: "48px" }}>
              <DashboardIcon />
            </ListItemIcon>
            <Link
              component={StyledNavLink}
              to="/"
              color="inherit"
              underline="none"
              rel="noopener"
            >
              Dashboard
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem label="mint">
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "48px" }}>
              <RocketLaunchIcon />
            </ListItemIcon>
            <Link
              component={StyledNavLink}
              to="mint"
              color="inherit"
              underline="none"
              rel="noopener"
            >
              Minting
            </Link>
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListSubheader>Collections</ListSubheader>
        <ListItem label="ships">
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "48px" }}>
              <SailingIcon />
            </ListItemIcon>
            <Link
              component={RouterLink}
              to="ships"
              color="inherit"
              underline="none"
              rel="noopener"
            >
              Ships
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem label="captains">
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "48px" }}>
              <FaceIcon />
            </ListItemIcon>
            <Link
              component={RouterLink}
              to="captains"
              color="inherit"
              underline="none"
              rel="noopener"
            >
              Captains
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem label="islands">
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "48px" }}>
              <PublicIcon />
            </ListItemIcon>
            <Link
              component={RouterLink}
              to="islands"
              color="inherit"
              underline="none"
              rel="noopener"
            >
              Islands
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default ListItems;
