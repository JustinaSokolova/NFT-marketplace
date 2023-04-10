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
    filter: brightness(70%);
  };
    &:hover .card-rarity{
    filter: brightness(70%);
  };
  &:hover .card-item{
    transform: scale(1.03);
    cursor: pointer
    
  }
}`;
  return (
    <ContainerStyled className="card-container">{children}</ContainerStyled>
  );
};
export default WrapperCardNft;
