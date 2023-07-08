import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

import CategoryCard from "./CategoryCard";
import RarityNftColor from "../../ui/RarityNftBadge";
import CollectionPreview from "./CollectionPreview";
import BoxContainer from "../../common/BoxContainer";

import SkeletonDescription from "../../ui/skeleton/SkeletonDescription";
import SkeletonCardNft from "../../ui/skeleton/SkeletonCardNft";
import {
  fetchMintInfo,
  getMintInfo,
  getMintInfoLoadingStatus,
} from "../../../store/mintInfo";

const MintInfo = () => {
  const dispatch = useDispatch();
  const mintInfoData = useSelector(getMintInfo());
  const isLoading = useSelector(getMintInfoLoadingStatus());

  console.log(mintInfoData);

  useEffect(() => {
    dispatch(fetchMintInfo());
  }, [dispatch]);

  return !isLoading ? (
    <>
      <Box
        sx={{
          maxWidth: "1180px",
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "24px",
          m: "0 auto",
        }}
      >
        <BoxContainer>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, my: 2 }}
          >
            {mintInfoData.descriptionTitle}
          </Typography>
          <Box sx={{ typography: "body1", my: 2, whiteSpace: "pre-wrap" }}>
            {mintInfoData.descriptionDescription}
          </Box>
          <Divider />
          {mintInfoData.rarity && (
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
                {mintInfoData.rarityTitle}
              </Typography>
              <Box sx={{ typography: "body1", my: 2 }}>
                {mintInfoData.rarityDescription}
              </Box>
              {mintInfoData.rarityItems.map((item, i) => {
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
          {mintInfoData.profitability && (
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
                {mintInfoData.profitabilityTitle}
              </Typography>
              <Box sx={{ typography: "body1", my: 2, whiteSpace: "pre-wrap" }}>
                {mintInfoData.profitabilityDescription}
              </Box>
              <Divider />
            </>
          )}
          {mintInfoData.nftParts && (
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
                {mintInfoData.nftPartsTitle}
              </Typography>
              <Box sx={{ typography: "body1", my: 2 }}>
                {mintInfoData.nftPartsDescription}
              </Box>
              {mintInfoData.nftPartsItems.map((item, i) => {
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
          <BoxContainer>
            <CollectionPreview data={mintInfoData} />
          </BoxContainer>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item xs={9}>
          <SkeletonDescription />
        </Grid>
        <Grid item xs={3}>
          <SkeletonCardNft />
        </Grid>
      </Grid>
    </>
  );
};

export default MintInfo;
