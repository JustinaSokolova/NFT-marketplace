import React from "react";

import Box from "@mui/material/Box";

import CollectionItem from "./CollectionItem";
import PaginationComp from "../../common/PaginationComp";
import SkeletonCollectionPage from "../../ui/skeleton/SkeletonCollectionPage";

const CollectionPage = ({
  collection,
  onPageChange,
  currentPage,
  count,
  pages,
  pathName,
}) => {
  return count > 0 ? (
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
            <CollectionItem key={item.tokenId} {...item} />
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
  ) : (
    <SkeletonCollectionPage />
  );
};

export default CollectionPage;
