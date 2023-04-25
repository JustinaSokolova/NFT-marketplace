import React from "react";

import { Box } from "@mui/material";

import WalletCard from "./WalletCard";
import WalletNftCard from "./WalletNftCard";

import CaptainIcon from "../../../assets/icons/pirate.png";
import ShipIcon from "../../../assets/icons/ship.png";
import IslandIcon from "../../../assets/icons/mountain.png";

const UserWallet = () => {
  return (
    <Box>
      <Box sx={{ typography: "h5", mb: "24px" }}>Wallet</Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <WalletCard
        // isLoading={isLoading}
        // value={data.tokenPerformance.performance}
        // coinSymbol={data.tokenPerformance.coinSymbol}
        // title="Total Sales"
        />

        <WalletNftCard
          icon={ShipIcon}
          collectionName="ships"
          // isLoading={isLoading}
          // value={data.islandsSold}
          // title="Islands Sold"
        />
        <WalletNftCard
          icon={CaptainIcon}
          collectionName="captains"
          // isLoading={isLoading}
          // value={data.captainsSold}
          // title="Captans Sold"
        />

        <WalletNftCard
          icon={IslandIcon}
          collectionName="islands"
          // isLoading={isLoading}
          // value={data.shipsSold}
          // title="Ships Sold"
        />
      </Box>
    </Box>
  );
};
export default UserWallet;
