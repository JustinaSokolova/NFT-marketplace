import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import BoxContainer from "../../common/BoxContainer";

const FeedbackPage = () => {
  return (
    <Box sx={{ maxWidth: "800px", minWidth: "600px" }}>
      <BoxContainer></BoxContainer>
    </Box>
  );
  // : (
  //   <Box sx={{ maxWidth: "800px", minWidth: "600px" }}>
  //     <SkeletonNftListRow />
  //   </Box>
  // );
};

export default FeedbackPage;
