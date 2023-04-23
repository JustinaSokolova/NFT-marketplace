import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

import CollectionItem from "./CollectionItem";
import PaginationComp from "../../common/PaginationComp";
import SkeletonCardNft from "../../ui/skeleton/SkeletonCardNft";

// const initCollectionData = {
//   info: { count: 0, pages: 0 },
//   result: [],
// };

const CollectionPage = ({
  collection,
  isLoading,
  onPageChange,
  currentPage,
  count,
  pages,
}) => {
  // const getCollection = { ...collectionService };

  // const [collectionData, setCollectionData] = useState(initCollectionData);
  // const [isLoading, setLoading] = useState(true);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const pageSize = 18;

  // const {
  //   result: collection,
  //   info: { count, pages },
  // } = collectionData;

  // const [currentPage, setCurrentPage] = useState(
  //   parseInt(location.search?.split("=")[1] || 1)
  // );

  // useEffect(() => {
  //   const getCollectionInfo = async () => {
  //     try {
  //       const data = await getCollection.get(currentPage, pageSize);
  //       setCollectionData(data);
  //       setLoading(false);
  //       if (data.info.pages < currentPage) {
  //         setCurrentPage(1);
  //         navigate(location.pathname);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getCollectionInfo();
  // }, [currentPage]);

  // const handlePageChange = (pageIndex) => {
  //   setCurrentPage(pageIndex);
  // };

  return !isLoading && count > 0 ? (
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
            <CollectionItem
              key={item.tokenId}
              {...item}
              isLoadingItem={isLoading}
            />
          ))}
        </Box>
        <PaginationComp
          isLoadingItem={isLoading}
          itemsCount={count}
          pagesCount={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  ) : (
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

export default CollectionPage;
