import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import SliderComp from "../../common/SliderComp";

import FilterButtonGroup from "./FilterButtonGroup";
import {
  fetchTopSalesCronos,
  getTopSalesCronos,
  getTopSalesCronosLoadingStatus,
} from "../../../store/topSalesNft";
import { loadFavouritesList } from "../../../store/favourites";
import { getIsLogIn } from "../../../store/user";
import SkeletonNftListRow from "../../ui/skeleton/SkeletonNftListRow";

const TopSalesCronos = () => {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const topSalesNftData = useSelector(getTopSalesCronos());
  const isLoading = useSelector(getTopSalesCronosLoadingStatus());
  const [selectedTime, setSelectedTime] = useState(30);
  const blockchainType = "cronos";

  useEffect(() => {
    dispatch(fetchTopSalesCronos({ blockchainType, selectedTime }));
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
          title="Cronos Top Sales"
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
export default TopSalesCronos;
