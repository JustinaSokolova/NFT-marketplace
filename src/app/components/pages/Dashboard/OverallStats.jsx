import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import BoxContainer from "../../common/BoxContainer";
import TotalSalesCard from "./TotalSalesCard";
import CollectionSalesCard from "./CollectionSalesCard";
import { SkeletonSalesCard } from "../../ui/skeleton/SkeletonSalesCard";
import FilterButtonGroup from "./FilterButtonGroup";
import {
  getTotalSales,
  getTotalSalesLoadingStatus,
  loadTotalSalesList,
} from "../../../store/totalSales";

const OverallStats = () => {
  const dispatch = useDispatch();
  const totalSalesData = useSelector(getTotalSales());
  const isLoading = useSelector(getTotalSalesLoadingStatus());

  const [selectedTime, setSelectedTime] = useState(30);

  useEffect(() => {
    dispatch(loadTotalSalesList(selectedTime));
  }, [selectedTime, dispatch]);

  const handleSelectedTime = (value) => {
    setSelectedTime(value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BoxContainer>
          <FilterButtonGroup
            title="Overall Stats"
            onButtonSelect={handleSelectedTime}
            selectedTime={selectedTime}
          />
          {!isLoading ? (
            <Grid container spacing={3}>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <TotalSalesCard
                  isLoading={isLoading}
                  value={totalSalesData.tokenPerformance.performance}
                  coinSymbol={totalSalesData.tokenPerformance.coinSymbol}
                  title="Total Sales"
                />
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <CollectionSalesCard
                  isLoading={isLoading}
                  value={totalSalesData.captainsSold}
                  title="Captans Sold"
                />
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <CollectionSalesCard
                  isLoading={isLoading}
                  value={totalSalesData.islandsSold}
                  title="Islands Sold"
                />
              </Grid>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <CollectionSalesCard
                  isLoading={isLoading}
                  value={totalSalesData.shipsSold}
                  title="Ships Sold"
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <SkeletonSalesCard />
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <SkeletonSalesCard />
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <SkeletonSalesCard />
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                    <SkeletonSalesCard />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </BoxContainer>
      </Grid>
    </Grid>
  );
};

export default OverallStats;
