import React from "react";
import Button from "@mui/material/Button";

const MainButton = ({ children, color, size }) => {
  return (
    <Button
      sx={{ minWidth: "180px", m: 2 }}
      variant="contained"
      href="#contained-buttons"
      color={color}
      size={size}
    >
      {children}
    </Button>
  );
};

export default MainButton;
