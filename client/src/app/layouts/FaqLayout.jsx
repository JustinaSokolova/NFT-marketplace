import React from "react";

import { Box, useTheme } from "@mui/material";
import FaqPage from "../components/pages/Faq/FaqPage";

const FaqLayout = () => {
  const theme = useTheme();
  return (
    <Box
      className="bg-image__faq "
      sx={{
        width: "100%",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: "12px 12px 0px 0px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          typography: "h3",
          fontWeight: "bold",
          mt: "56px",
          color: theme.palette.primary.light,
        }}
      >
        FAQs
      </Box>
      <Box
        sx={{
          typography: "body1",
          mt: "18px",
          color: theme.palette.primary.light,
        }}
      >
        Please refer the Frequently ask question for your quick help
      </Box>
      <Box sx={{ position: "absolute", alignSelf: "center", top: "50%" }}>
        <FaqPage />
      </Box>
    </Box>
  );
};

export default FaqLayout;
