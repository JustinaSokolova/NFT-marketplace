import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import RarityNftBadge from "../../ui/RarityNftBadge";
import { useCoinRate } from "../../../hooks/useCoinRate";
import { displayDate } from "../../../utils/displayDate";
import ButtonDetails from "../../ui/ButtonDetails";
import WrapperCardNft from "../../ui/WrapperCardNft";
import { cronosIcon } from "../../ui/CronosIcon";

const CollectionItem = (props) => {
  const {
    tokenId,
    owner,
    price,
    image,
    rarity,
    marketplaceState,
    coinSymbol,
    lastUpdated,
    showPrice,
  } = props;
  const { сoinUsdPrice, isLoading } = useCoinRate();
  const mintPriceUsd = "$" + (price * сoinUsdPrice.usd).toFixed(2);

  return (
    <>
      <WrapperCardNft>
        <Box
          className="card-item"
          sx={{
            position: "relative",
            width: "200px",
            height: "100%",
            transition: "transform 0.3s",
          }}
        >
          <Box
            className="card-rarity"
            sx={{
              position: "absolute",
              top: "6px",
              right: "6px",
              zIndex: "10",
              transition: "filter 0.3s",
            }}
          >
            <RarityNftBadge rarity={rarity} />
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
                height: "198px",
                width: "198px",
                objectFit: "contain",
                borderRadius: "8px",
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
                {marketplaceState === 0 || showPrice ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      typography: "body1",
                      fontWeight: "bold",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {coinSymbol === "CRO" && cronosIcon} {price}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      typography: "subtitle2",
                      textTransform: "uppercase",
                      color: "success.main",
                    }}
                  >
                    Sold
                  </Box>
                )}
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
                  }}
                >
                  {!isLoading && (showPrice || marketplaceState === 0)
                    ? mintPriceUsd
                    : ""}{" "}
                </Box>
              </Box>

              <Box
                sx={{
                  typography: "caption",
                  alignSelf: "flex-start",
                  mt: "-10px",
                }}
              >
                {displayDate(lastUpdated)}
              </Box>
            </CardActions>
          </Card>
        </Box>
        <ButtonDetails />
      </WrapperCardNft>
    </>
  );
};

export default CollectionItem;
