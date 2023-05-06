import React from "react";
import Box from "@mui/material/Box";

const UnlistedTitle = () => {
  return (
    <Box
      sx={{
        typography: "subtitle2",
        textTransform: "uppercase",
        color: "success.main",
      }}
    >
      Unlisted
    </Box>
  );
};

export default UnlistedTitle;
