import React from "react";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

import WalletCard from "./WalletCard";
import WalletNftCard from "./WalletNftCard";

import CaptainIcon from "../../../assets/icons/pirate.png";
import ShipIcon from "../../../assets/icons/ship.png";
import IslandIcon from "../../../assets/icons/mountain.png";

const UserWallet = ({ captainsCount, shipsCount, islandsCount }) => {
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
          value={shipsCount}
        />
        <WalletNftCard
          icon={CaptainIcon}
          collectionName="captains"
          value={captainsCount}
        />

        <WalletNftCard
          icon={IslandIcon}
          collectionName="islands"
          value={islandsCount}
        />
      </Box>
    </Box>
  );
};

UserWallet.propTypes = {
  collection: PropTypes.object,
};
export default UserWallet;
