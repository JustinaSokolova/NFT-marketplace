import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

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

import { getUserWallet } from "../../../store/user";
import { walletAddressShort } from "../../../utils/walletAddressShort";
import { getUserBalance } from "../../../services/web3.service";
import { useCoinRate } from "../../../hooks/useCoinRate";

const WalletCard = () => {
  const theme = useTheme();
  const [copyState, setCopyState] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [shortWallet, setShortWallet] = useState();
  const userWallet = useSelector(getUserWallet());

  const { сoinUsdPrice, isLoading } = useCoinRate();
  const userBalanceUsd = "$" + (userBalance * сoinUsdPrice.usd).toFixed(2);

  async function getBalance() {
    if (userWallet) {
      setUserBalance(await getUserBalance(userWallet));
    }
  }

  useEffect(() => {
    if (userWallet) {
      setShortWallet(walletAddressShort(userWallet));
      getBalance();
    }
  }, [userWallet]);

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
              {userBalance} CRO
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: theme.palette.secondary[200],
              }}
            >
              {!isLoading ? userBalanceUsd : "$0.0"}
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
              justifyContent: "space-between",
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
                ml: "16px",
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
              {userWallet ? shortWallet : ""}
            </Box>
            {userWallet && (
              <CopyToClipboard
                text={userWallet}
                onCopy={() => setCopyState(true)}
                sx={{ alignSelf: "flex-end", mr: "16px" }}
              >
                <ContentCopyIcon
                  className="svg-cursor"
                  sx={{
                    fontSize: "1.25rem",
                  }}
                />
              </CopyToClipboard>
            )}
          </Box>

          <Snackbar
            open={copyState}
            autoHideDuration={3000}
            onClose={() => setCopyState(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert
              onClose={() => setCopyState(false)}
              severity="success"
              sx={{ width: "240px" }}
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
