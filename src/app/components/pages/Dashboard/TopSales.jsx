import React, { useState, useEffect } from "react";

import { Box } from "@mui/material";
import { Grid } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import topSalesNftService from "../../../services/topSalesNft.service";
import SliderComp from "../../common/SliderComp";

import SkeletonTopSales from "../../ui/skeleton/SkeletonTopSales";
import FilterButtonGroup from "./FilterButtonGroup";

const TopSales = () => {
  const [topSalesData, setTopSalesData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(30);

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

  return !isLoading ? (
    <BoxContainer elevation={1}>
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
          <SliderComp props={topSalesData} />
        </Box>
      </Box>
    </BoxContainer>
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BoxContainer elevation={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <SkeletonTopSales />
            </Grid>
          </Grid>
        </BoxContainer>
      </Grid>
    </Grid>
  );
};
export default TopSales;
