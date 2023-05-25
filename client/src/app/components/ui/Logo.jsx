import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const Logo = ({ variant, variantSubtitle }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", position: "relative", mt: "-10px" }}>
      <Typography
        variant={variant}
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "block" },
          color: theme.palette.success.dark,
        }}
        className="font-logo"
      >
        Navy.online
      </Typography>
      <Typography
        variant={variantSubtitle}
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          display: { xs: "none", sm: "block" },
          color: theme.palette.primary.dark,
          position: "absolute",
          right: "5%",
          top: "75%",
        }}
        className="font-logo"
      >
        metaverse
      </Typography>
    </Box>
  );
};

export default Logo;
