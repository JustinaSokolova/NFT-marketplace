import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CategoryCard from "./CategoryCard";

import RarityNftColor from "../../ui/RarityNftColor";
import СollectionPreview from "./СollectionPreview";
import BoxContainer from "../../common/BoxContainer";
import mintService from "../../../services/mint.service";

const MintInfo = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getMintInfo = async () => {
      try {
        const data = await mintService.get();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMintInfo();
  }, []);

  return !isLoading ? (
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
            <СollectionPreview data={data} />
          </BoxContainer>
        </Box>
      </Box>
    </>
  ) : (
    <Box>Loading...</Box>
  );
};

export default MintInfo;
