import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import CollectionItemCard from "./CollectionItemCard";
import PaginationComp from "../../common/PaginationComp";

const CollectionItems = ({
  collection,
  onPageChange,
  currentPage,
  count,
  pages,
  pathName,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "42px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {collection.map((item) => (
            <CollectionItemCard key={item.tokenId} item={item} />
          ))}
        </Box>
        <PaginationComp
          itemsCount={count}
          pagesCount={pages}
          currentPage={currentPage}
          pathName={pathName}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

CollectionItems.propTypes = {
  collection: PropTypes.array,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  count: PropTypes.number,
  pages: PropTypes.number,
  pathName: PropTypes.string,
};

export default CollectionItems;
