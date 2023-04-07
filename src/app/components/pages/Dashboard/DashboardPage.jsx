import React, { useState, useEffect } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import TotalSalesCard from "./TotalSalesCard";
// import gridSpacing from "../../../store/constant.js ";
import TopSales from "./TopSales";

import totalSalesService from "../../../services/totalSales.service";
import { SkeletonSalesCard } from "../../ui/skeleton/SkeletonSalesCard";
import CollectionSalesCard from "./CollectionSalesCard";
import SkeletonTopSales from "../../ui/skeleton/SkeletonTopSales";
import BoxContainer from "../../common/BoxContainer";

const DashboardPage = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const monthTime = 30;
  const weekTime = 7;
  const dayTime = 1;

  async function getSalesList(value) {
    try {
      const content = await totalSalesService.get(value);
      setData(content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSalesList(monthTime);
  }, []);

  return !isLoading ? (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BoxContainer elevation={1}>
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
                title="Capitans Sold"
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

      <Grid item xs={12}>
        <BoxContainer elevation={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TopSales isLoading={isLoading} />
            </Grid>
          </Grid>
        </BoxContainer>
      </Grid>
    </Grid>
  ) : (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BoxContainer elevation={1}>
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
          </BoxContainer>
        </Grid>
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
    </>
  );
};
export default DashboardPage;
