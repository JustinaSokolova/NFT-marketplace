import React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Logo = ({ variant }) => {
  const theme = useTheme();

  return (
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
  );
};

export default Logo;
