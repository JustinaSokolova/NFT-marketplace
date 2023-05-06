import React from "react";
import PropTypes from "prop-types";

// import { orange, purple, lightGreen, grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import CoinIcon from "../../assets/icons/starPixel.png";

const RarityNftBadge = ({ rarity }) => {
  // const getColorButton = (rarity) => {
  //   switch (rarity) {
  //     case "Legendary":
  //       return orange["A400"];
  //     case "Epic":
  //       return purple["A400"];
  //     case "Rare":
  //       return lightGreen["A400"];
  //     case "Common":
  //       return grey["300"];
  //     default:
  //       return grey["300"];
  //   }
  // };

  const ColorButton = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText(getColorButton(rarity)),
    // backgroundColor: getColorButton(rarity),
    backgroundColor: "#ffffff6b",
    borderRadius: "5px",
    boxShadow: "none",
    variant: "contained",
    padding: "3px 3px",
    minWidth: "28px",
    maxWidth: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      // background: getColorButton(rarity),
      backgroundColor: "#ffffff6b",
      borderColor: "none",
      boxShadow: "none",
    },
    cursor: "default",
  }));

  const coinIcon = <img src={CoinIcon} alt="rarity icon" width="16px" />;

  if (rarity === "Legendary") {
    return (
      <ColorButton key={rarity}>
        {coinIcon}
        {coinIcon}
        {coinIcon}
        {coinIcon}
      </ColorButton>
    );
  }
  if (rarity === "Epic") {
    return (
      <ColorButton key={rarity}>
        {coinIcon}
        {coinIcon}
        {coinIcon}
      </ColorButton>
    );
  }
  if (rarity === "Rare") {
    return (
      <ColorButton key={rarity}>
        {coinIcon}
        {coinIcon}
      </ColorButton>
    );
  }
  if (rarity === "Common") {
    return <ColorButton key={rarity}>{coinIcon}</ColorButton>;
  }
};

RarityNftBadge.propTypes = {
  rarity: PropTypes.string,
};

export default RarityNftBadge;
