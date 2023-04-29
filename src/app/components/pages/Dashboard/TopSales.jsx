import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import SliderComp from "../../common/SliderComp";

import SkeletonTopSales from "../../ui/skeleton/SkeletonTopSales";
import FilterButtonGroup from "./FilterButtonGroup";
import {
  getTopSalesNft,
  getTopSalesNftLoadingStatus,
  loadTopSalesNftList,
} from "../../../store/topSalesNft";

const TopSales = () => {
  const dispatch = useDispatch();
  const topSalesNftData = useSelector(getTopSalesNft());
  const isLoading = useSelector(getTopSalesNftLoadingStatus());

  const [selectedTime, setSelectedTime] = useState(30);

  useEffect(() => {
    dispatch(loadTopSalesNftList(selectedTime));
  }, [selectedTime, dispatch]);

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
          title="Top Sales"
          onButtonSelect={handleSelectedTime}
          selectedTime={selectedTime}
        />
        <Box sx={{ width: "100%", margin: "0 auto" }}>
          {!isLoading ? (
            <SliderComp props={topSalesNftData} />
          ) : (
            <SkeletonTopSales />
          )}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default TopSales;
