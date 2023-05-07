import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { cronosIcon } from "../../ui/CronosIcon";
import NftPriceUsd from "../../common/NftPriceUsd";
import { getIsLogIn, getUserWallet } from "../../../store/user";
import { MintCaptains } from "../../../services/web3.service";
import { Typography } from "@mui/material";

const СollectionPreview = ({ data }) => {
  const navigate = useNavigate();
  const isLogIn = useSelector(getIsLogIn());
  const userWallet = useSelector(getUserWallet());
  const handleMint = async () => {
    if (isLogIn) {
      if (userWallet) {
        try {
          await MintCaptains();
          toast.success(
            "Your Captain has been successfully minted! You will see it in the profile in a few minutes."
          );
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error("You need to connect a wallet to mint");
      }
    } else {
      navigate("/auth/register");
    }
  };

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
          <Button
            color="primary"
            size="small"
            variant="contained"
            className="main-btn"
            onClick={handleMint}
          >
            Mint
          </Button>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                typography: "body1",
                fontWeight: "bold",
                whiteSpace: "pre-wrap",
              }}
            >
              Price: {data.mintingDetails[0].coinSymbol === "CRO" && cronosIcon}{" "}
              {data.mintingDetails[0].mintPriceEth} /{" "}
              <NftPriceUsd price={data.mintingDetails[0].mintPriceEth} />
            </Box>
          </Box>
        </CardActions>
      </Card>
      {!isLogIn || !userWallet ? (
        <Typography variant="caption" color="error" sx={{ ml: 1 }}>
          You need to connect a wallet to mint
        </Typography>
      ) : (
        ""
      )}
    </>
  );
};

СollectionPreview.propTypes = {
  data: PropTypes.object,
};

export default СollectionPreview;
