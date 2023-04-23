import React from "react";
import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// project import
import MainCard from "../../ui/MainCard";

const AuthCardWrapper = ({ children, ...other }) => {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        "& > *": {
          flexGrow: 1,
          flexBasis: "50%",
        },
        ...(theme.palette.mode === "dark"
          ? { backgroundColor: theme.palette.default }
          : { backgroundColor: theme.palette.background.paper }),
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
};

AuthCardWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthCardWrapper;
