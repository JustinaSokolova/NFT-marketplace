import React from "react";
import RarityNftColor from "../../ui/RarityNftColor";
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { useCoinRate } from "../../../hooks/useCoinRate";
// import { displayDate } from "../../../../utils/displayDate";

const CollectionItem = (props) => {
  const { tokenId, owner, price, image, rarity, marketplaceState, coinSymbol } =
    props;
  const { сoinUsdPrice, isLoading } = useCoinRate();
  const mintPriceUsd = (price * сoinUsdPrice.usd).toFixed(4);

  const ContainerStyled = styled("div")`
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
  &:hover {
    transform: scale(1.03);
    cursor: pointer
    
  }
}`;

  const ButtonStyled = styled(Button)(() => ({
    position: "absolute",
    top: "30%",
    margin: "0 auto",
    borderRadius: "8px",
    minWidth: "80px",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    transition: "display 0.3s",
  }));
  return (
    <>
      <ContainerStyled className="card-container">
        <Box
          className="card-rarity"
          sx={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: "10",
            transition: "filter 0.3s",
          }}
        >
          <RarityNftColor rarity={rarity} />
        </Box>
        <Card
          sx={{
            width: "200px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="outlined"
        >
          <CardMedia
            className="card-img"
            component="img"
            alt="nft image"
            image={image}
            sx={{
              height: "180px",
              width: "180px",
              objectFit: "contain",
              borderRadius: "8px",
              m: "10px",
              transition: "filter 0.3s",
            }}
          />
          <CardActions
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: "24px",
                ml: "8px",
              }}
            >
              <Box
                sx={{
                  typography: "body2",
                  whiteSpace: "pre-wrap",
                }}
              >
                {`#${tokenId}`}
              </Box>
              <Box
                sx={{
                  typography: "body1",
                  fontWeight: "bold",
                  whiteSpace: "pre-wrap",
                }}
              >
                {marketplaceState === 0 && price}{" "}
                {marketplaceState === 0 && coinSymbol}{" "}
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                mb: "14px",
              }}
            >
              <Box
                sx={{
                  typography: "body2",
                  whiteSpace: "pre-wrap",
                }}
              >
                {owner.substr(0, 4) + "..." + owner.substr(-4, 4)}
              </Box>
              <Box
                sx={{
                  typography: "body2",
                  whiteSpace: "pre-wrap",
                }}
              >
                {marketplaceState === 0 && !isLoading ? mintPriceUsd : " "}{" "}
                {marketplaceState === 0 && "USD"}
              </Box>
            </Box>

            {marketplaceState === 0 ? (
              <ButtonStyled
                className="button-hidden"
                variant="contained"
                size="small"
              >
                Buy
              </ButtonStyled>
            ) : (
              <ButtonStyled
                className="button-hidden"
                variant="contained"
                size="small"
                color="success"
              >
                Not for sale
              </ButtonStyled>
            )}
            {/* <Box
                sx={{
                  typography: "subtitle2",
                  fontWeight: "light",
                  alignSelf: "flex-start",
                }}
              >
                listed - {displayDate(lastUpdated)}
              </Box> */}
          </CardActions>
        </Card>
      </ContainerStyled>
    </>
  );
};

export default CollectionItem;
