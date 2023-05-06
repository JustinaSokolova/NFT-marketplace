import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

import SliderComp from "../../common/SliderComp";
import {
  getFavourites,
  getFavouritesLoadingStatus,
  loadFavouritesList,
} from "../../../store/favourites";
import SkeletonNftListRow from "../../ui/skeleton/SkeletonNftListRow";

export const UserFavouritesNFT = () => {
  const dispatch = useDispatch();

  const favouritesNFT = useSelector(getFavourites());
  const isLoading = useSelector(getFavouritesLoadingStatus());

  useEffect(() => {
    dispatch(loadFavouritesList());
  }, [dispatch]);
  console.log(favouritesNFT);

  if (isLoading) return <SkeletonNftListRow />;

  return favouritesNFT.length > 0 ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: "24px",
      }}
    >
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <SliderComp collection={favouritesNFT} favItems="favItems" />
      </Box>
    </Box>
  ) : (
    <Box sx={{ typography: "body1", mt: "24px" }}>
      {`You don't have any favourites NFT yet :(`}
    </Box>
  );
};
