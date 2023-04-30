import React from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

import WalletCard from "./WalletCard";
import WalletNftCard from "./WalletNftCard";

import CaptainIcon from "../../../assets/icons/pirate.png";
import ShipIcon from "../../../assets/icons/ship.png";
import IslandIcon from "../../../assets/icons/mountain.png";

const UserWallet = ({ collection }) => {
  return (
    <Box sx={{ mb: "24px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <WalletCard />

        <WalletNftCard
          icon={ShipIcon}
          collectionName="ships"
          // isLoading={isLoading}
          value={collection.ships.total}
        />
        <WalletNftCard
          icon={CaptainIcon}
          collectionName="captains"
          // isLoading={isLoading}
          value={collection.captains.total}
        />

        <WalletNftCard
          icon={IslandIcon}
          collectionName="islands"
          // isLoading={isLoading}
          value={collection.islands.total}
        />
      </Box>
    </Box>
  );
};

UserWallet.propTypes = {
  collection: PropTypes.object,
};
export default UserWallet;
