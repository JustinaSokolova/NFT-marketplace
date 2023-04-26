import React, { useState, useEffect } from "react";

import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import BoxContainer from "../../common/BoxContainer";
import totalSalesService from "../../../services/totalSales.service";
import TotalSalesCard from "./TotalSalesCard";
import CollectionSalesCard from "./CollectionSalesCard";
import { SkeletonSalesCard } from "../../ui/skeleton/SkeletonSalesCard";
import FilterButtonGroup from "./FilterButtonGroup";

const OverallStats = () => {
  const [data, setData] = useState({});
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
      const content = await totalSalesService.get(value);
      setData(content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return !isLoading ? (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BoxContainer>
          <FilterButtonGroup
            title="Overall Stats"
            onButtonSelect={handleSelectedTime}
            selectedTime={selectedTime}
          />
          <Grid container spacing={3}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <TotalSalesCard
                isLoading={isLoading}
                value={data.tokenPerformance.performance}
                coinSymbol={data.tokenPerformance.coinSymbol}
                title="Total Sales"
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CollectionSalesCard
                isLoading={isLoading}
                value={data.captainsSold}
                title="Captans Sold"
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CollectionSalesCard
                isLoading={isLoading}
                value={data.islandsSold}
                title="Islands Sold"
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <CollectionSalesCard
                isLoading={isLoading}
                value={data.shipsSold}
                title="Ships Sold"
              />
            </Grid>
          </Grid>
        </BoxContainer>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BoxContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={20} />
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
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <SkeletonSalesCard />
            </Grid>
          </Grid>
        </BoxContainer>
      </Grid>
    </Grid>
  );
};

export default OverallStats;
