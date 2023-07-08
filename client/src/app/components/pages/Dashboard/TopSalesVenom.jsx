import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import SliderComp from "../../common/SliderComp";

import FilterButtonGroup from "./FilterButtonGroup";
import {
  fetchTopSalesVenom,
  getTopSalesVenomLoadingStatus,
  getTopSalesVenom,
} from "../../../store/topSalesNft";
import { loadFavouritesList } from "../../../store/favourites";
import { getIsLogIn } from "../../../store/user";
import SkeletonNftListRow from "../../ui/skeleton/SkeletonNftListRow";

const TopSalesVenom = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const topSalesNftData = useSelector(getTopSalesVenom());
  const isLoading = useSelector(getTopSalesVenomLoadingStatus());

  const [selectedTime, setSelectedTime] = useState(30);
  const blockchainType = "venom";
  useEffect(() => {
    dispatch(fetchTopSalesVenom({ blockchainType, selectedTime }));
    isLogIn && dispatch(loadFavouritesList());
  }, [selectedTime, isLogIn, dispatch]);

  const handleSelectedTime = (value) => {
    setSelectedTime(value);
  };

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
          title="Venom Top Sales"
          onButtonSelect={handleSelectedTime}
          selectedTime={selectedTime}
        />
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          {!isLoading ? (
            <SliderComp collection={topSalesNftData} />
          ) : (
            <SkeletonNftListRow />
          )}
          {topSalesNftData &&
            topSalesNftData.length <= 0 &&
            "There are no sold NFTs for the selected period"}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default TopSalesVenom;
