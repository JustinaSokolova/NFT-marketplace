import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SailingIcon from "@mui/icons-material/Sailing";
import FaceIcon from "@mui/icons-material/Face";
import PublicIcon from "@mui/icons-material/Public";

export const mainListItems = (
  <>
    <ListItem>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: "48px" }}>
          <DashboardIcon />
        </ListItemIcon>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          Dashboard
        </Link>
      </ListItemButton>
    </ListItem>
    <ListItem>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: "48px" }}>
          <RocketLaunchIcon />
        </ListItemIcon>
        <Link
          component={RouterLink}
          to="mint"
          color="inherit"
          underline="none"
          rel="noopener"
        >
          Minting
        </Link>
      </ListItemButton>
    </ListItem>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader>Collections</ListSubheader>
    <ListItem>
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
    <ListItem>
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
    <ListItem>
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
  </>
);
