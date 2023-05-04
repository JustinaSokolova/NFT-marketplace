import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CollectionPage from "../components/pages/Collection/CollectionPage";
import SkeletonCollectionPage from "../components/ui/skeleton/SkeletonCollectionPage";
import { loadFavouritesList } from "../store/favourites";
import {
  fetchIslands,
  getIslands,
  getIslandsInfo,
  getIslandsLoadingStatus,
} from "../store/islands";

const Islands = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collectionIslandsData = useSelector(getIslands());
  const isLoading = useSelector(getIslandsLoadingStatus());
  const collectionIslandsInfo = useSelector(getIslandsInfo());

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  useEffect(() => {
    dispatch(fetchIslands(currentPage));
  }, []);

  useEffect(() => {
    dispatch(fetchIslands(currentPage));
    if (!isLoading && collectionIslandsInfo.pages < currentPage) {
      setCurrentPage(1);
      navigate(location.pathname);
    }
  }, [currentPage]);

  useEffect(() => {
    dispatch(loadFavouritesList());
  }, [dispatch]);

  const handlePageChange = (pageIndex) => {
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
      dispatch(fetchIslands(pageIndex));
    }
  };

  return !isLoading ? (
    <CollectionPage
      collection={collectionIslandsData}
      isLoading={isLoading}
      currentPage={currentPage}
      count={collectionIslandsInfo.count}
      pages={collectionIslandsInfo.pages}
      pathName={location.pathname}
      onPageChange={handlePageChange}
    />
  ) : (
    <SkeletonCollectionPage />
  );
};

export default Islands;
