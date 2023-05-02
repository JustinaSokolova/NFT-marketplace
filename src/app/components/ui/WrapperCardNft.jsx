import React from "react";

import { styled } from "@mui/material/styles";

const WrapperCardNft = ({ children }) => {
  const ContainerStyled = styled("div")`
  width: 200px;
  position: relative;
  transition: transform 0.3s;
  &:hover .button-hidden {
      display: flex;
  };
  &:hover .card-img {
    filter: brightness(80%);
  };
    &:hover .card-rarity{
    filter: brightness(80%);
  };
  &:hover .card-item{
    transform: scale(1.03);
    cursor: pointer
  };
  &:hover .card-favourite{
    filter: brightness(100%);
  }
}`;
  return (
    <ContainerStyled className="card-container">{children}</ContainerStyled>
  );
};
export default WrapperCardNft;
