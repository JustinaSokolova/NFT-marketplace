import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  fetchCollectionItem,
  getCollectionItem,
  getCollectionItemLoadingStatus,
} from "../../../store/collectionItem";
import BoxContainer from "../../common/BoxContainer";
import BackButton from "../../common/BackButton";
import { NavLink, useParams } from "react-router-dom";
import { getIsLogIn, getUserWallet } from "../../../store/user";

const CollectionItemPage = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const userWallet = useSelector(getUserWallet());

  const params = useParams();
  const { address, tokenId } = params;

  useEffect(() => {
    dispatch(fetchCollectionItem({ address, tokenId }));
  }, [dispatch]);

  // const nftItemData = useSelector((state) => state.collectionItem.entities);
  const nftItemData = useSelector(getCollectionItem());

  const isLoading = useSelector(getCollectionItemLoadingStatus());

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return !isLoading && nftItemData ? (
    <BoxContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          p: "16px",
        }}
      >
        <BackButton />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Card
            sx={{
              minWidth: "320px",
              mr: "42px",
            }}
            variant="outlined"
          >
            <CardMedia
              component="img"
              alt="nft preview"
              image={nftItemData.image}
              sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          </Card>
          <Box>
            <Box sx={{ typography: "h5" }}>
              {nftItemData.collectionName} #{nftItemData.tokenId}
            </Box>
            {isLogIn && userWallet ? (
              <Button
                color="primary"
                size="small"
                variant="contained"
                className="main-btn"
              >
                <NavLink>Buy</NavLink>
              </Button>
            ) : (
              <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
                You need to connect a wallet to buy
              </Typography>
            )}

            <Box sx={{ minWidth: "520px" }}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Attributes</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {nftItemData.visuals.map((item) => (
                    <Card
                      variant="outlined"
                      sx={{ minWidth: 120, m: 2 }}
                      key={item.value}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {item.trait_type}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {item.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
      </Box>
    </BoxContainer>
  ) : (
    "Loading"
  );
};

export default CollectionItemPage;
