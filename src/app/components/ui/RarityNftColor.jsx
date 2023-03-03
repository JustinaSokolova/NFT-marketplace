import React from "react";
import PropTypes from "prop-types";

import { orange, purple, lightGreen, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const RarityNftColor = ({ rarity }) => {
  const getColorButton = (rarity) => {
    switch (rarity) {
      case "Legendary":
        return orange["A400"];
      case "Epic":
        return purple["A400"];
      case "Rare":
        return lightGreen["A400"];
      case "Common":
        return grey["300"];
      default:
        return grey["300"];
    }
  };
  let ColorButton;
  ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(getColorButton(rarity)),
    backgroundColor: getColorButton(rarity),
    fontSize: 10,
    boxShadow: "none",
    "&:hover": {
      background: getColorButton(rarity),
      borderColor: "none",
      boxShadow: "none",
    },
    cursor: "default",
  }));

  return (
    <ColorButton
      variant="contained"
      size="small"
      sx={{ display: "block" }}
      key={rarity}
    >
      {rarity}
    </ColorButton>
  );
};

RarityNftColor.propTypes = {
  rarity: PropTypes.string,
};

export default RarityNftColor;
