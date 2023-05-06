import React from "react";
import PropTypes from "prop-types";

import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/system";

const BoxContainer = ({ children }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        width: "100%",
        p: "24px",
        ...(theme.palette.mode === "dark"
          ? { backgroundColor: theme.palette.background[900] }
          : { backgroundColor: theme.palette.background.paper }),
      }}
      elevation={0}
    >
      {children}
    </Paper>
  );
};
BoxContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default BoxContainer;
