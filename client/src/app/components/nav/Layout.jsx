import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import ListItems from "./ListItems";
import ToggleTheme from "../ToggleTheme";
import Logo from "../ui/Logo";
import config from "../../config.json";
import UserMenu from "./UserMenu";
import {
  getIsLogIn,
  logOut,
  getUserWallet,
  attachMetamask,
  getUserAttachedWallet,
} from "../../store/user";
import { walletAddressShort } from "../../utils/walletAddressShort";
import {
  AddressSignatureMetamask,
  ConnectMetamask,
  IsMetamaskExtension,
  IsMetamaskTrue,
} from "../../services/web3.service";
import localStorageService from "../../services/localStorage.service";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${config.drawerWidth - 20}px`,
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
    width: `calc(100% - ${config.drawerWidth}px)`,
    marginLeft: `${config.drawerWidth}px`,
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
  justifyContent: "flex-end",
}));

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const userWallet = useSelector(getUserWallet());
  const attachedWalletAddress = useSelector(getUserAttachedWallet());

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut());
    window.location.reload();
  };

  const handleMetamask = async () => {
    if (!userWallet) {
      if (isLogIn) {
        if (IsMetamaskTrue() === false) {
          return toast.error("MetaMask not installed!");
        } else {
          if (attachedWalletAddress) {
            const { ethAddress } = await ConnectMetamask();
            if (attachedWalletAddress === ethAddress) {
              localStorageService.setWallet(ethAddress);
              window.location.reload();
            }
          } else {
            try {
              const data = await AddressSignatureMetamask();
              dispatch(attachMetamask(data));
            } catch (error) {
              toast.error(error);
            }
          }
        }
      } else {
        navigate("/auth/login");
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box>
          <AppBar
            sx={{
              position: "fixed",
              boxShadow: "none",
              border: "none",
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              height: "100px",
            }}
            open={open}
          >
            <Toolbar
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                height: "100px",
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

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Logo variant="h3" variantSubtitle="h5" />
                <Box>
                  <Button
                    color="secondary"
                    size="medium"
                    variant="contained"
                    className="main-btn"
                    onClick={handleMetamask}
                    sx={{
                      textTransform: userWallet ? "lowercase" : "uppercase",
                    }}
                  >
                    {isLogIn && userWallet
                      ? walletAddressShort(userWallet)
                      : "Connect wallet"}
                  </Button>

                  {isLogIn && (
                    <Box>
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                      >
                        <AccountCircle />
                      </IconButton>
                      <UserMenu
                        menuId={menuId}
                        anchorEl={anchorEl}
                        isMenuOpen={isMenuOpen}
                        handleMenuClose={handleMenuClose}
                      />
                    </Box>
                  )}

                  <ToggleTheme />
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer
          sx={{
            width: config.drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: config.drawerWidth,
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
            <List sx={{ height: "100%", ml: "16px" }}>
              <ListItems />
            </List>
            <Box sx={{ alignSelf: "center", mb: 2 }}>
              <Button
                color="secondary"
                size="medium"
                variant="contained"
                className="main-btn"
              >
                {!isLogIn ? (
                  <NavLink to="/auth/login">Log In</NavLink>
                ) : (
                  <NavLink onClick={handleLogout}>Log Out</NavLink>
                )}
              </Button>
            </Box>
          </Box>
        </Drawer>
        <Main
          open={open}
          sx={{
            padding: "24px",
            mt: "100px",
            mr: "20px",
            borderRadius: "12px 12px 0px 0px",
            minHeight: "calc(100vh - 100px)",
            ...(theme.palette.mode === "dark"
              ? { backgroundColor: theme.palette.background.default }
              : { backgroundColor: theme.palette.primary.light }),
          }}
        >
          <Outlet />
        </Main>
      </Box>
    </>
  );
};
export default Layout;
