import React from "react";

import Box from "@mui/material/Box";
import SkeletonCardNft from "./SkeletonCardNft";

const SkeletonCollectionItems = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
      <SkeletonCardNft />
    </Box>
  );
};

export default SkeletonCollectionItems;
