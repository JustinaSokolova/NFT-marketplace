import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const ButtonFilterClear = ({ onHandleClear }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<DeleteIcon />}
      onClick={onHandleClear}
    >
      Clear all
    </Button>
  );
};

export default ButtonFilterClear;
