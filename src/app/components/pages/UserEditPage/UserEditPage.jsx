import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import BoxContainer from "../../common/BoxContainer";
import ChangePassword from "./ChangePassword";

const UserEditPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <BoxContainer>
      <Box
        sx={{
          width: "100%",
          height: "220px",
        }}
        className="bg-image__settings"
      ></Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: "16px",
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          size="medium"
          sx={{
            maxWidth: "140px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "24px",
            mt: "14px",
          }}
          onClick={handleClick}
        >
          <NavigateBeforeIcon />
          Go back
        </Button>
        <ChangePassword />
      </Box>
    </BoxContainer>
  );
};
export default UserEditPage;
