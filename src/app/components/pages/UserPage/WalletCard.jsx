import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Alert, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import WalletIcon from "../../../assets/icons/wallet.png";

const WalletCard = () => {
  const theme = useTheme();
  const wallet = "hhb4989vd4dshhb";
  const [copyState, setcopyState] = useState(false);

  return (
    <Box sx={{ minWidth: 360, mb: "24px", mr: "24px" }}>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Box>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                fontSize: "2.125rem",
                fontWeight: 500,
                mr: 1,
                mt: 1.75,
                mb: 0.75,
              }}
            >
              {/* {value.toFixed(1)} {coinSymbol ? coinSymbol : ""} */} 8312.1
              CRO
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: theme.palette.secondary[200],
              }}
            >
              $ 866
            </Typography>
          </Box>
          <Box sx={{ mr: 1, mt: 1.75, mb: 0.75 }}>
            <img src={WalletIcon} width="42px" height="42px" alt="WalletIcon" />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            width: "100%",
            p: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: theme.palette.primary.main,
              p: 1,
            }}
          >
            <Box
              type="typography"
              whiteSpace="no-wrap"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: theme.palette.grey[50],
                mr: "16px",
              }}
            >
              Wallet address:
            </Box>
            <Box
              type="typography"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: theme.palette.grey[50],
                mr: "24px",
              }}
            >
              {wallet}
            </Box>
            <CopyToClipboard
              text={wallet}
              onCopy={() => setcopyState(true)}
              sx={{ alignSelf: "flex-end" }}
            >
              <ContentCopyIcon
                className="svg-cursor"
                sx={{
                  fontSize: "1.25rem",
                }}
              />
            </CopyToClipboard>
          </Box>

          <Snackbar
            open={copyState}
            autoHideDuration={3000}
            onClose={() => setcopyState(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert
              onClose={() => setcopyState(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Copied Text
            </Alert>
          </Snackbar>
        </CardActions>
      </Card>
    </Box>
  );
};

export default WalletCard;
