import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CollectionPage from "../components/pages/Collection/CollectionPage";
import {
  getCaptains,
  getCaptainsInfo,
  getCaptainsLoadingStatus,
  loadCaptainsList,
} from "../store/captains";

const Captains = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collectionData = useSelector(getCaptains());
  const isLoading = useSelector(getCaptainsLoadingStatus());
  const collectionInfo = useSelector(getCaptainsInfo());

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  useEffect(() => {
    console.log("fff");
    dispatch(loadCaptainsList(currentPage));
    if (collectionInfo.pages < currentPage) {
      setCurrentPage(1);
      navigate(location.pathname);
    }
  }, [currentPage]);

  const handlePageChange = (pageIndex) => {
    console.log(pageIndex);
    setCurrentPage(pageIndex);
    dispatch(loadCaptainsList(pageIndex));
  };

  return (
    <CollectionPage
      collection={collectionData}
      isLoading={isLoading}
      currentPage={currentPage}
      count={collectionInfo.count}
      pages={collectionInfo.pages}
      onPageChange={handlePageChange}
    />
  );
};

export default Captains;
