import React from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import MainButton from "../../ui/MainButton";
import { cronosIcon } from "../../ui/CronosIcon";
import { useCoinRate } from "../../../hooks/useCoinRate";

const СollectionPreview = ({ data }) => {
  const { сoinUsdPrice, isLoading } = useCoinRate();

  const mintPriceUsd =
    "$" + (data.mintingDetails[0].mintPriceEth * сoinUsdPrice.usd).toFixed(4);
  return (
    <>
      <Box
        sx={{
          typography: "body1",
          mb: 2,
          whiteSpace: "pre-wrap",
          textAlign: "center",
        }}
      >
        {data.collectionItemsLeft}/{data.collectionSize}
      </Box>
      <Card
        sx={{
          maxWidth: "320px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="outlined"
      >
        <CardMedia
          component="img"
          alt="nft preview"
          image={data.collectionPreview[0]}
          sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
        />
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MainButton color="primary" size="small" variant="contained">
            Mint
          </MainButton>
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
            Price: {data.mintingDetails[0].coinSymbol === "CRO" && cronosIcon}{" "}
            {data.mintingDetails[0].mintPriceEth} /{" "}
            {!isLoading ? mintPriceUsd : "0.0"}
          </Box>
        </CardActions>
      </Card>
    </>
  );
};

СollectionPreview.propTypes = {
  data: PropTypes.object,
  сoinUsdPrice: PropTypes.object,
};

export default СollectionPreview;
