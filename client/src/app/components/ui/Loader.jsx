import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mr: "16px",
      }}
    >
      <CircularProgress size={25} />
    </Box>
  );
};
export default Loader;
