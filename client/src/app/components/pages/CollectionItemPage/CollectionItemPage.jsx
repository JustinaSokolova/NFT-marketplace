import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

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
  CardActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  fetchCollectionItem,
  getCollectionItem,
  getCollectionItemLoadingStatus,
} from "../../../store/collectionItem";
import BoxContainer from "../../common/BoxContainer";
import BackButton from "../../common/BackButton";
import { getIsLogIn, getUserWallet } from "../../../store/user";
import { walletAddressShort } from "../../../utils/walletAddressShort";
import { cronosIcon } from "../../ui/CronosIcon";
import NftPriceUsd from "../../common/NftPriceUsd";
import UnlistedTitle from "../../ui/UnlistedTitle";

const CollectionItemPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { address, tokenId } = params;
  const isLogIn = useSelector(getIsLogIn());
  const userWallet = useSelector(getUserWallet());
  const [expanded, setExpanded] = useState("panel1");

  useEffect(() => {
    dispatch(fetchCollectionItem({ address, tokenId }));
  }, [dispatch]);

  // const nftItemData = useSelector((state) => state.collectionItem.entities);
  const nftItemData = useSelector(getCollectionItem());
  const isLoading = useSelector(getCollectionItemLoadingStatus());

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return !isLoading && nftItemData ? (
    <Box sx={{ maxWidth: "1180px", m: "0 auto" }}>
      <BoxContainer>
        <Box
          sx={{
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
                borderRadius: "none",
                mr: "42px",
              }}
              variant="outlined"
            >
              <CardMedia
                component="img"
                alt="nft preview"
                image={nftItemData.image}
                sx={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "none",
                }}
              />
            </Card>
            <Box>
              <Box sx={{ typography: "h5", mb: 2 }}>
                {nftItemData.collectionName} #{nftItemData.tokenId}
              </Box>
              <Card variant="outlined" sx={{ maxWidth: 320, mb: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Price:
                  </Typography>
                  {nftItemData.marketplaceState !== 2 ? (
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {nftItemData.coinSymbol === "CRO" && cronosIcon}{" "}
                      {nftItemData.price} /{" "}
                      <NftPriceUsd price={nftItemData.price} />
                    </Typography>
                  ) : (
                    <UnlistedTitle />
                  )}
                </CardContent>
                <CardActions>
                  {isLogIn &&
                    userWallet &&
                    nftItemData.marketplaceState === 1 && (
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        fullWidth
                      >
                        <NavLink>Buy</NavLink>
                      </Button>
                    )}
                  {!isLogIn || !userWallet ? (
                    <Typography variant="caption" color="error">
                      You need to connect a wallet to buy
                    </Typography>
                  ) : (
                    ""
                  )}
                </CardActions>
              </Card>

              <Box sx={{ minWidth: "520px" }}>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  variant="outlined"
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
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  variant="outlined"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                  >
                    <Typography>Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Box sx={{ typography: "body2" }}>Contract Address</Box>
                      <Box>
                        {walletAddressShort(nftItemData.contractAddress)}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Box sx={{ typography: "body2" }}>Token ID</Box>
                      <Box>{nftItemData.tokenId}</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Box sx={{ typography: "body2" }}>Token Standard</Box>
                      <Box>ERC721</Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Box sx={{ typography: "body2" }}>Owner</Box>
                      <Box>{walletAddressShort(nftItemData.owner)}</Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  variant="outlined"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>Traits</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    {nftItemData.traits.map((item) => (
                      <Box
                        key={item.value}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <Box sx={{ typography: "body2" }}>
                          {item.trait_type}
                        </Box>
                        <Box>{item.value}</Box>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxContainer>
    </Box>
  ) : (
    "Loading..."
  );
};

export default CollectionItemPage;
