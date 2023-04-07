import React from "react";
// import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography, Card } from "@mui/material";

// project imports

// assets
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const CardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  border: "none",
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  zIndex: 5,
  "&:after": {
    content: '""',
    zIndex: -1,
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -105,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    zIndex: -1,
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -135,
    right: -25,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const CollectionSalesCard = ({ value, title }) => {
  const theme = useTheme();

  return (
    <>
      <CardWrapper>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container sx={{ alignItems: "center", flexWrap: "nowrap" }}>
                <Grid item>
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "2.125rem",
                      fontWeight: 500,
                      mr: 1,
                      mt: 1.75,
                      mb: 0.75,
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      width: "1em",
                      height: "1em",
                      ...theme.typography.smallAvatar,
                      backgroundColor: theme.palette.primary[200],
                      color: theme.palette.primary.dark,
                    }}
                  >
                    <ArrowUpwardIcon
                      fontSize="inherit"
                      sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                    />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: theme.palette.primary[200],
                }}
              >
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};
export default CollectionSalesCard;
