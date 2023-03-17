import React, { useState } from "react";
// import themeContext from "../../components/themeContext";
// import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";
import { MainListItems, SecondaryListItems } from "./ListItems";

import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ToggleTheme from "../ToggleTheme";
import MainButton from "../ui/MainButton";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth - 20}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // sx={{
  //   ...(theme.palette.mode === "dark"
  //     ? { bgcolor: "#424242", color: "#fff" }
  //     : { bgcolor: "#fff", color: "#000000de" }),
  // }}
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        <AppBar
          sx={{
            position: "fixed",
            boxShadow: "none",
            border: "none",
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            height: "88px",
          }}
          open={open}
        >
          <Toolbar
            sx={{
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              height: "88px",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Navy.online
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainButton color="secondary" size="medium" variant="contained">
                Connect wallet
              </MainButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="secondary"
              >
                <Badge badgeContent={17} color="warning">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <ToggleTheme />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "none",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{ height: "98px" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {/* <Divider /> */}
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flexGrow: 1, ml: "16px" }}>
              <List>
                <MainListItems />
              </List>
              <List>
                <SecondaryListItems />
              </List>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <MainButton color="secondary" size="medium" variant="contained">
                Log In
              </MainButton>
            </Box>
          </Box>
        </Drawer>
        <Main
          open={open}
          sx={{
            padding: "24px",
            mt: "88px",
            mr: "20px",
            borderRadius: "12px 12px 0px 0px",
            minHeight: "calc(100vh - 88px)",
            ...(theme.palette.mode === "dark"
              ? { bgcolor: theme.palette.background[900] }
              : { bgcolor: theme.palette.primary.light }),
          }}
        >
          <Outlet />
        </Main>
      </Box>
    </>
  );
}
