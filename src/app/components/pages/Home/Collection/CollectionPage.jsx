import React, { useState, useEffect } from "react";

import CollectionItem from "./CollectionItem";

import Box from "@mui/material/Box";

const initCollectionData = {
  info: { count: 0 },
  result: [],
};

const CollectionPage = ({ collectionService }) => {
  const getCollection = { ...collectionService };
  const [collectionData, setEpisodes] = useState(initCollectionData);
  const [isLoading, setLoading] = useState(true);

  const {
    result: collection,
    info: { count },
  } = collectionData;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getCollectionInfo = async () => {
      try {
        const data = await getCollection.get(currentPage);
        setEpisodes(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCollectionInfo();
  }, [currentPage]);

  const pageSize = 10;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return !isLoading ? (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: "24px",
        }}
      >
        {collection.map((item) => (
          <CollectionItem key={item.tokenId} {...item} />
        ))}
      </Box>
    </>
  ) : (
    <Box>Loading...</Box>
  );
};

export default CollectionPage;
