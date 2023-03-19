import React from "react";
import PropTypes from "prop-types";

import { orange, purple, lightGreen, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SkullIcon from "../../assets/icons/skull-pixel-art.png";

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
    // color: theme.palette.getContrastText(getColorButton(rarity)),
    // backgroundColor: getColorButton(rarity),
    backgroundColor: "#7c4dff3a",
    borderRadius: "0px",
    boxShadow: "none",
    variant: "contained",
    padding: "3px 6px",
    minWidth: "28px",
    maxWidth: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      // background: getColorButton(rarity),
      backgroundColor: "#7c4dff3a",
      borderColor: "none",
      boxShadow: "none",
    },
    cursor: "default",
  }));

  const skullIcon = <img src={SkullIcon} alt="rarity icon" width="14px" />;

  if (rarity === "Legendary") {
    return (
      <ColorButton key={rarity}>
        {skullIcon}
        {skullIcon}
        {skullIcon}
        {skullIcon}
      </ColorButton>
    );
  }
  if (rarity === "Epic") {
    return (
      <ColorButton key={rarity}>
        {skullIcon}
        {skullIcon}
        {skullIcon}
      </ColorButton>
    );
  }
  if (rarity === "Rare") {
    return (
      <ColorButton key={rarity}>
        {skullIcon}
        {skullIcon}
      </ColorButton>
    );
  }
  if (rarity === "Common") {
    return <ColorButton key={rarity}>{skullIcon}</ColorButton>;
  }
};

RarityNftColor.propTypes = {
  rarity: PropTypes.string,
};

export default RarityNftColor;
