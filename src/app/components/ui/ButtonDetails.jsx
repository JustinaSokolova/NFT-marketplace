import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonDetails = () => {
  const ButtonStyled = styled(Button)(() => ({
    position: "absolute",
    top: "30%",
    right: "30%",
    borderRadius: "8px",
    minWidth: "80px",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    transition: "display 0.3s",
  }));
  return (
    <ButtonStyled
      className="button-hidden"
      variant="contained"
      size="small"
      color="secondary"
    >
      Details
    </ButtonStyled>
  );
};

export default ButtonDetails;
