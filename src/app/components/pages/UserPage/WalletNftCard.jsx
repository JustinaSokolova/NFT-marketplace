import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const WalletNftCard = ({ icon, collectionName }) => {
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
            12 {collectionName}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WalletNftCard;
