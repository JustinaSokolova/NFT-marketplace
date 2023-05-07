import React from "react";
import { Box, useTheme } from "@mui/material";
import FeedbackPage from "../components/pages/FeedbackPage/FeedbackPage";
import EmailImg from "../assets/img/email-icon.png";

const Feedback = () => {
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
        Send us a message
      </Box>
      <Box
        sx={{
          typography: "body1",
          maxWidth: "500px",
          textAlign: "center",
          mt: "18px",
          color: theme.palette.primary.light,
        }}
      >
        If you have any problems or have any suggestions, please contact us. We
        will definitely reply to you soon.
      </Box>
      <Box
        sx={{
          width: "100%",
          flexBasis: "100%",
          flexGrow: 0,
          maxWidth: "100%",
          position: "relative",
        }}
      >
        <img src={EmailImg} alt="email img" className="bg-email-icon" />
      </Box>
      <Box sx={{ position: "absolute", alignSelf: "center", top: "50%" }}>
        <FeedbackPage />
      </Box>
    </Box>
  );
};

export default Feedback;
