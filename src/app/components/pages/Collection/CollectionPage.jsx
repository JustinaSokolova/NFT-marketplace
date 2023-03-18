import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CollectionItem from "./CollectionItem";

import Box from "@mui/material/Box";
import PaginationComp from "../../common/PaginationComp";

const initCollectionData = {
  info: { count: 0, pages: 0 },
  result: [],
};

const CollectionPage = ({ collectionService }) => {
  const getCollection = { ...collectionService };
  const [collectionData, setCollectionData] = useState(initCollectionData);
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    result: collection,
    info: { count, pages },
  } = collectionData;

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  useEffect(() => {
    const getCollectionInfo = async () => {
      try {
        const data = await getCollection.get(currentPage);
        setCollectionData(data);
        setLoading(false);
        if (data.info.pages < currentPage) {
          setCurrentPage(1);
          navigate("/captains");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCollectionInfo();
  }, [currentPage]);

  const pageSize = 24;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return !isLoading ? (
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
            // alignContent: "flex-start",
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
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  ) : (
    <Box>Loading...</Box>
  );
};

export default CollectionPage;
