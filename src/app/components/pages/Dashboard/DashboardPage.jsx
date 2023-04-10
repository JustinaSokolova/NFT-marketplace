import React from "react";

import { Box } from "@mui/material";

// import gridSpacing from "../../../store/constant.js ";

import TopSales from "./TopSales";
import OverallStats from "./OverallStats";

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
        <TopSales />
      </Box>
    </>
  );
};
export default DashboardPage;
