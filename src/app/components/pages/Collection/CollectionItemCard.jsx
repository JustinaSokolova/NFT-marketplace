import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

import RarityNftBadge from "../../ui/RarityNftBadge";
import { useCoinRate } from "../../../hooks/useCoinRate";
import { displayDate } from "../../../utils/displayDate";
import ButtonDetails from "../../ui/ButtonDetails";
import WrapperCardNft from "../../ui/WrapperCardNft";
import { cronosIcon } from "../../ui/CronosIcon";
import { addFavourites, removeFavourites } from "../../../store/favourites";

const CollectionItemCard = (props) => {
  const {
    tokenId,
    owner,
    price,
    image,
    rarity,
    contractAddress,
    marketplaceState,
    coinSymbol,
    lastUpdated,
    showPrice,
    favourite,
  } = props;
  const { сoinUsdPrice, isLoading } = useCoinRate();
  const mintPriceUsd = "$" + (price * сoinUsdPrice.usd).toFixed(2);

  const dispatch = useDispatch();

  const handleToggleFavourite = () => {
    favourite
      ? dispatch(removeFavourites({ contractAddress, tokenId }))
      : dispatch(addFavourites({ contractAddress, tokenId }));
  };

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
            className="card-favourite"
            sx={{
              position: "absolute",
              top: "0px",
              left: "0px",
              zIndex: "100",
              transition: "filter 0.3s",
            }}
          >
            <IconButton
              size="small"
              edge="end"
              aria-label="favourite"
              aria-haspopup="true"
              onClick={handleToggleFavourite}
            >
              {favourite ? (
                <FavoriteIcon sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: pink[500] }} />
              )}
            </IconButton>
          </Box>
          <Box
            className="card-rarity"
            sx={{
              position: "absolute",
              top: "174px",
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
                {
                  marketplaceState === 0 || marketplaceState === 1 ? (
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
                    ""
                  )
                  // <Box
                  //   sx={{
                  //     typography: "subtitle2",
                  //     textTransform: "uppercase",
                  //     color: "success.main",
                  //   }}
                  // >
                  //   Sold
                  // </Box>
                }
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
                  {!isLoading &&
                  (marketplaceState === 0 || marketplaceState === 1)
                    ? mintPriceUsd
                    : ""}{" "}
                </Box>
              </Box>
              {marketplaceState === 1 && (
                <Box
                  sx={{
                    typography: "caption",
                    alignSelf: "flex-start",
                    mt: "-10px",
                  }}
                >
                  {displayDate(lastUpdated)}
                </Box>
              )}
            </CardActions>
          </Card>
        </Box>
        <ButtonDetails />
      </WrapperCardNft>
    </>
  );
};

export default CollectionItemCard;
