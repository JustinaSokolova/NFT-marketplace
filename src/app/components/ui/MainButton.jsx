import React from "react";
import Button from "@mui/material/Button";

const MainButton = ({ children, color, size, variant, href, disabled }) => {
  return (
    <Button
      sx={{
        minWidth: "160px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: "16px",
      }}
      variant={variant}
      href={href || "#contained-buttons"}
      color={color}
      size={size}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default MainButton;
