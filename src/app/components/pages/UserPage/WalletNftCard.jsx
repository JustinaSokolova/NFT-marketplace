import React from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getUserWallet } from "../../../store/user";

const WalletNftCard = ({ icon, collectionName, value }) => {
  const userWallet = useSelector(getUserWallet());

  return (
    <Box sx={{ minWidth: 240, mr: "24px" }}>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "8px",
          }}
        >
          <Box>
            <img src={icon} width="42px" height="42px" alt="collection icon" />
          </Box>

          <Typography
            sx={{
              whiteSpace: "nowrap",
              fontSize: "1.25rem",
              fontWeight: 500,
              mt: "18px",
            }}
          >
            {userWallet ? value : 0} {collectionName}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WalletNftCard;
