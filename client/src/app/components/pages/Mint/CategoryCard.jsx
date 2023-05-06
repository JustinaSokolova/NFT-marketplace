import React from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import RarityNftBadge from "../../ui/RarityNftBadge";

const CategoryCard = ({ categoryDetails }) => {
  return categoryDetails.map((item, i) => {
    return (
      <Card
        sx={{
          width: "120px",
          height: "120px",
          m: 1,
          position: "relative",
        }}
        variant="outlined"
        key={10 + i}
      >
        <CardMedia
          component="img"
          alt="nft details"
          image={item.imageUrl}
          sx={{ height: "120px", width: "120px", objectFit: "contain" }}
        />
        <Box sx={{ position: "absolute", top: "4px", right: "4px" }}>
          <RarityNftBadge rarity={item.rarity}></RarityNftBadge>
        </Box>
      </Card>
    );
  });
};

CategoryCard.propTypes = {
  categoryDetails: PropTypes.array,
};
export default CategoryCard;
