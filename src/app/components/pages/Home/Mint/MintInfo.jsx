import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import API from "../../../../data";

import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CategoryCard from "./CategoryCard";
import RarityNftColor from "../../../ui/RarityNftColor";
import СollectionPreview from "./СollectionPreview";
import BoxContainer from "../../../common/BoxContainer";

const MintInfo = () => {
  const [data, setData] = useState();
  const [сoinUsdPrice, setCoinUsdPrice] = useState({ usd: 0 });
  useEffect(() => {
    API.fetchMint.fetchMint().then((data) => setData(data));
  }, []);

  const getCoinRate = () => {
    API.fetchCoinRateUsd
      .fetchCoinRateUsd()
      .then((rate) => setCoinUsdPrice(rate));
  };

  useEffect(() => {
    getCoinRate();
    console.log("useEffect 1");
  }, []);

  useEffect(() => {
    let id = setInterval(() => {
      getCoinRate();
      console.log("useEffect 2");
    }, 60000);
    return () => clearInterval(id);
  });

  return data ? (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "24px",
        }}
      >
        <BoxContainer elevation={1}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, my: 2 }}
          >
            {data.descriptionTitle}
          </Typography>
          <Box sx={{ typography: "body1", my: 2, whiteSpace: "pre-wrap" }}>
            {data.descriptionDescription}
          </Box>
          <Divider />
          {data.rarity && (
            <>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  my: 2,
                }}
              >
                {data.rarityTitle}
              </Typography>
              <Box sx={{ typography: "body1", my: 2 }}>
                {data.rarityDescription}
              </Box>
              {data.rarityItems.map((item, i) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      my: 2,
                    }}
                    key={item.rarity + i}
                  >
                    <RarityNftColor rarity={item.rarity} />
                    <Box sx={{ ml: 2 }}>{"- " + item.description}</Box>
                  </Box>
                );
              })}
              <Divider />
            </>
          )}
          {data.profitability && (
            <>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  my: 2,
                }}
              >
                {data.profitabilityTitle}
              </Typography>
              <Box sx={{ typography: "body1", my: 2, whiteSpace: "pre-wrap" }}>
                {data.profitabilityDescription}
              </Box>
              <Divider />
            </>
          )}
          {data.nftParts && (
            <>
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  my: 2,
                }}
              >
                {data.nftPartsTitle}
              </Typography>
              <Box sx={{ typography: "body1", my: 2 }}>
                {data.nftPartsDescription}
              </Box>
              {data.nftPartsItems.map((item, i) => {
                return (
                  <Box key={item.categoryTitle + i}>
                    <Typography variant="overline" component="div">
                      {" "}
                      {item.categoryTitle}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                        my: 2,
                      }}
                      key={item.titleText + i}
                    >
                      <CategoryCard
                        categoryDetails={item.categoryDetails}
                      ></CategoryCard>
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </BoxContainer>
        <Box sx={{ position: "sticky", top: "64px" }}>
          <BoxContainer elevation={1}>
            <СollectionPreview data={data} сoinUsdPrice={сoinUsdPrice} />
          </BoxContainer>
        </Box>
      </Box>
    </>
  ) : (
    <Box>Loading...</Box>
  );
};

export default MintInfo;
