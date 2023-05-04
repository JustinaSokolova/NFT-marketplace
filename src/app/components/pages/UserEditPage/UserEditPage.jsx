import React from "react";

import { Box } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";
import ChangePassword from "./ChangePassword";
import BackButton from "../../common/BackButton";

const UserEditPage = () => {
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
        <BackButton />
        <ChangePassword />
      </Box>
    </BoxContainer>
  );
};
export default UserEditPage;
