import React from "react";
import RarityNftColor from "../../../ui/RarityNftColor";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import MainButton from "../../../ui/MainButton";

import { useCoinRate } from "../../../../hooks/useCoinRate";
// import { displayDate } from "../../../../utils/displayDate";

const CollectionItem = (props) => {
  const { tokenId, owner, price, image, rarity, marketplaceState, coinSymbol } =
    props;

  const { сoinUsdPrice, isLoading } = useCoinRate();

  const mintPriceUsd = (price * сoinUsdPrice.usd).toFixed(4);

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", top: "1px", right: "0px" }}>
          <RarityNftColor rarity={rarity} />
        </Box>
        <Card
          sx={{
            maxWidth: "200px",
            maxHeight: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="outlined"
        >
          <CardMedia
            component="img"
            alt="nft image"
            image={image}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
          <CardActions
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
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
              <MainButton color="primary" size="small" variant="contained">
                Buy
              </MainButton>
            ) : (
              <MainButton
                color="primary"
                size="small"
                variant="contained"
                disabled
              >
                Not for sale
              </MainButton>
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
      </Box>
    </>
  );
};

export default CollectionItem;
