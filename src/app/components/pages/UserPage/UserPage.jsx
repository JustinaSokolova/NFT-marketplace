import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import BoxContainer from "../../common/BoxContainer";
import {
  fetchUserNft,
  getUserNftCaptains,
  getUserNftIslands,
  getUserNftLoadingStatus,
  getUserNftShips,
} from "../../../store/userBoughtNft";

import UserWallet from "./UserWallet";
import UserCollection from "./UserCollection";
import SkeletonNftListRow from "../../ui/skeleton/SkeletonNftListRow";
import { UserFavouritesNFT } from "./UserFavouritesNFT";
import { loadFavouritesList } from "../../../store/favourites";

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userNftCaptains = useSelector(getUserNftCaptains());
  const userNftShips = useSelector(getUserNftShips());
  const userNftIslands = useSelector(getUserNftIslands());
  const isLoading = useSelector(getUserNftLoadingStatus());

  useEffect(() => {
    dispatch(fetchUserNft());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadFavouritesList());
  }, [dispatch]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <BoxContainer>
      <Box
        sx={{
          width: "100%",
          height: "220px",
        }}
        className="bg-image__profile"
      ></Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: "16px",
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          size="medium"
          sx={{
            maxWidth: "140px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "24px",
            mt: "14px",
          }}
          onClick={handleClick}
        >
          <NavigateBeforeIcon />
          Go back
        </Button>
        <Box sx={{ typography: "h5", mb: "24px" }}>Wallet</Box>
        <Box sx={{ width: "100%", mb: "24px" }}>
          {!isLoading ? (
            <UserWallet
              captainsCount={userNftCaptains.total}
              shipsCount={userNftShips.total}
              islandsCount={userNftIslands.total}
              isLoading={isLoading}
            />
          ) : (
            <SkeletonNftListRow />
          )}
        </Box>
        <Divider flexItem />
        <Box sx={{ typography: "h5", mt: "24px" }}>Favourites NFT</Box>
        <Box sx={{ width: "100%", mb: "24px" }}>
          <UserFavouritesNFT />
        </Box>
        <Divider flexItem />
        <Box sx={{ typography: "h5", mt: "24px" }}>My NFT</Box>
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          {!isLoading && (
            <UserCollection
              collection={userNftCaptains.items}
              title="Captains"
            />
          )}
          {!isLoading && (
            <UserCollection collection={userNftShips.items} title="Ships" />
          )}
          {!isLoading && (
            <UserCollection collection={userNftIslands.items} title="Islands" />
          )}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default UserPage;
