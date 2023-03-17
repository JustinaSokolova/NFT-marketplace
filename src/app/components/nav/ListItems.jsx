import React, { useState } from "react";
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

export const MainListItems = () => {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <ListItem>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
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
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
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
};

export const SecondaryListItems = () => {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <ListSubheader>Collections</ListSubheader>
      <ListItem>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
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
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
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
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
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
};
