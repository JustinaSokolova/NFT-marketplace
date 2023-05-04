import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Button
      color="primary"
      variant="outlined"
      size="medium"
      sx={{
        maxWidth: "140px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: "24px",
        mt: "14px",
      }}
      onClick={handleClick}
    >
      <NavigateBeforeIcon />
      Go back
    </Button>
  );
};

export default BackButton;
