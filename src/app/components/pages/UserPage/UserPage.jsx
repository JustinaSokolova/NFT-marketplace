import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import BoxContainer from "../../common/BoxContainer";
import {
  getUserNftList,
  getUserNftLoadingStatus,
  loadUserNftList,
} from "../../../store/userBoughtNft";

import UserWallet from "./UserWallet";
import UserCollection from "./UserCollection";
import SkeletonNftListRow from "../../ui/skeleton/SkeletonNftListRow";
import { SkeletonSalesCard } from "../../ui/skeleton/SkeletonSalesCard";

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userNftData = useSelector(getUserNftList());
  const isLoading = useSelector(getUserNftLoadingStatus());

  // const [currentPage, setCurrentPage] = useState(
  //   parseInt(location.search?.split("=")[1] || 1)
  // );

  useEffect(() => {
    dispatch(loadUserNftList());
  }, [dispatch]);
  console.log(userNftData);
  // useEffect(() => {
  //   if (!isLoading && collectionUserNftInfo.pages < currentPage) {
  //     setCurrentPage(1);
  //     navigate(location.pathname);
  //   }
  // }, [currentPage]);

  // const handlePageChange = (pageIndex) => {
  //   if (pageIndex !== currentPage) {
  //     setCurrentPage(pageIndex);
  //     dispatch(loadUserNftList(pageIndex));
  //   }
  // };

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
            <UserWallet collection={userNftData} />
          ) : (
            <SkeletonNftListRow />
          )}
        </Box>
        <Divider />
        <Box sx={{ typography: "h5" }}>My NFT</Box>
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          {!isLoading ? (
            <UserCollection
              collection={userNftData.captains.items}
              title="Captains"
            />
          ) : (
            <SkeletonNftListRow />
          )}
          {!isLoading ? (
            <UserCollection
              collection={userNftData.ships.items}
              title="Ships"
            />
          ) : (
            <SkeletonNftListRow />
          )}
          {!isLoading ? (
            <UserCollection
              collection={userNftData.islands.items}
              title="Islands"
            />
          ) : (
            <SkeletonNftListRow />
          )}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default UserPage;
