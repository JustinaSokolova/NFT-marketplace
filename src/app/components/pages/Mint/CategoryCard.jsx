import React from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import RarityNftColor from "../../ui/RarityNftColor";

const CategoryCard = ({ categoryDetails }) => {
  return categoryDetails.map((item, i) => {
    return (
      <Card
        sx={{ maxWidth: "120px", maxHeight: "100%", m: 1 }}
        variant="outlined"
        key={10 + i}
      >
        <CardMedia
          component="img"
          alt="nft details"
          image={item.imageUrl}
          sx={{ maxHeight: "120px", maxWidth: "100%", objectFit: "contain" }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RarityNftColor rarity={item.rarity}></RarityNftColor>
        </CardContent>
      </Card>
    );
  });
};

CategoryCard.propTypes = {
  categoryDetails: PropTypes.array,
};
export default CategoryCard;
