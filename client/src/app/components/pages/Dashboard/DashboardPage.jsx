import React from "react";

import { Box } from "@mui/material";

// import gridSpacing from "../../../store/constant.js ";

import OverallStats from "./OverallStats";
import TopSalesCronos from "./TopSalesCronos";
import TopSalesVenom from "./TopSalesVenom";

const DashboardPage = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <OverallStats />
        <TopSalesVenom />
        <TopSalesCronos />
      </Box>
    </>
  );
};
export default DashboardPage;
