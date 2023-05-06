import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import SliderComp from "../../common/SliderComp";

import FilterButtonGroup from "./FilterButtonGroup";
import {
  fetchTopSalesNft,
  getTopSalesNft,
  getTopSalesNftLoadingStatus,
} from "../../../store/topSalesNft";
import { loadFavouritesList } from "../../../store/favourites";
import { getIsLogIn } from "../../../store/user";

const TopSales = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const topSalesNftData = useSelector(getTopSalesNft());
  const isLoading = useSelector(getTopSalesNftLoadingStatus());

  const [selectedTime, setSelectedTime] = useState(30);

  useEffect(() => {
    dispatch(fetchTopSalesNft(selectedTime));
    isLogIn && dispatch(loadFavouritesList());
  }, [selectedTime, dispatch]);

  // useEffect(() => {
  //   isLogIn && dispatch(loadFavouritesList());
  // }, [dispatch]);

  const handleSelectedTime = (value) => {
    setSelectedTime(value);
  };

  if (topSalesNftData === null) {
    return "There are no sold NFTs for the selected period";
  }

  return (
    <BoxContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <FilterButtonGroup
          title="Top Sales"
          onButtonSelect={handleSelectedTime}
          selectedTime={selectedTime}
        />
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          {!isLoading && <SliderComp collection={topSalesNftData} />}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default TopSales;
