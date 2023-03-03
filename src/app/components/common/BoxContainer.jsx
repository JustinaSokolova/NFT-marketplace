import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const BoxContainer = ({ children, elevation }) => {
  return (
    <Box>
      <Paper sx={{ p: "24px" }} elevation={elevation}>
        {children}
      </Paper>
    </Box>
  );
};
BoxContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default BoxContainer;
