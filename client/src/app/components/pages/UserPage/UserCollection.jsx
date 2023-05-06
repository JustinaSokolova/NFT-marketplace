import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import SliderComp from "../../common/SliderComp";

const UserCollection = ({ collection, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mt: "24px",
      }}
    >
      <Box sx={{ typography: "h6" }}>{title}</Box>
      <Box sx={{ width: "100%", margin: "0 auto" }}>
        <SliderComp collection={collection} userNft="userNft" />
      </Box>

      {!collection.length && (
        <Box sx={{ typography: "body1" }}>
          {`You don't have any ${title} yet :(`}
        </Box>
      )}
    </Box>
  );
};

UserCollection.propTypes = {
  collection: PropTypes.array,
  title: PropTypes.string,
};

export default UserCollection;
