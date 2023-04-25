import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import BoxContainer from "../../common/BoxContainer";
import SliderComp from "../../common/SliderComp";
import SkeletonTopSales from "../../ui/skeleton/SkeletonTopSales";

import topSalesNftService from "../../../services/topSalesNft.service";
import UserWallet from "./UserWallet";

const UserPage = () => {
  const [topSalesData, setTopSalesData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    getSalesList(selectedTime);
  }, [selectedTime]);

  const handleSelectedTime = (value) => {
    setSelectedTime(value);
  };

  async function getSalesList(value) {
    try {
      const content = await topSalesNftService.get(value);
      setTopSalesData(content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <BoxContainer elevation={1}>
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
          }}
          onClick={handleClick}
        >
          <NavigateBeforeIcon />
          Go back
        </Button>
        <UserWallet />
        <Box sx={{ typography: "h5" }}>My NFT</Box>
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          {
            // вместо слайдера сделать пагинацию
          }
          {!isLoading ? (
            <SliderComp props={topSalesData} />
          ) : (
            <SkeletonTopSales />
          )}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default UserPage;
