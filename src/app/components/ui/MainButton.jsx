import React from "react";
import Button from "@mui/material/Button";

const MainButton = ({ children, color, size, variant, disabled }) => {
  return (
    <Button
      sx={{ minWidth: "160px", m: 2 }}
      variant={variant}
      href="#contained-buttons"
      color={color}
      size={size}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default MainButton;
