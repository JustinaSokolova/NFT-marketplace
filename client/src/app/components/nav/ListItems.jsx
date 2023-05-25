import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";

import StyledNavLink from "./StyledNavLink";
import DashboardIcon from "../../assets/icons/dashboard.png";
import MintIcon from "../../assets/icons/rocket.png";
import ShipIcon from "../../assets/icons/ship.png";
import CaptainIcon from "../../assets/icons/pirate.png";
import IslandIcon from "../../assets/icons/mountain.png";
import HomeIcon from "../../assets/icons/home2.png";
import MailIcon from "../../assets/icons/mail.png";
import QuestionIcon from "../../assets/icons/question-mark.png";
import { Divider } from "@mui/material";

const ListItems = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <List>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={DashboardIcon}
                    width="24px"
                    height="24px"
                    alt="Dashboard Icon"
                  />
                </Box>
                <StyledNavLink to="/">Dashboard</StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={MintIcon}
                    width="26px"
                    height="26px"
                    alt="Mint Icon"
                  />
                </Box>
                <StyledNavLink to="mint">Minting</StyledNavLink>
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <ListSubheader>Collections</ListSubheader>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={ShipIcon}
                    width="26px"
                    height="26px"
                    alt="Ship Icon"
                  />
                </Box>
                <StyledNavLink to="ships">Ships</StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={CaptainIcon}
                    width="26px"
                    height="26px"
                    alt="Captain Icon"
                  />
                </Box>
                <StyledNavLink to="captains">Captains</StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={IslandIcon}
                    width="26px"
                    height="26px"
                    alt="Island Icon"
                  />
                </Box>
                <StyledNavLink to="islands">Islands</StyledNavLink>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <List>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2, mb: "-6px" }}>
                  <img
                    src={QuestionIcon}
                    width="26px"
                    height="26px"
                    alt="Island Icon"
                  />
                </Box>
                <StyledNavLink to="faq">FAQ</StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={MailIcon}
                    width="26px"
                    height="26px"
                    alt="Island Icon"
                  />
                </Box>
                <StyledNavLink to="feedback">Сontact us</StyledNavLink>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={HomeIcon}
                    width="26px"
                    height="26px"
                    alt="Island Icon"
                  />
                </Box>
                <StyledNavLink
                  to="https://navy-metaverse.online/"
                  target="_blank"
                >
                  About project
                </StyledNavLink>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default ListItems;
