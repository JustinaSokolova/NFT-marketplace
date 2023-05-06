import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CollectionPage from "../components/pages/Collection/CollectionPage";
import SkeletonCollectionPage from "../components/ui/skeleton/SkeletonCollectionPage";

import { loadFavouritesList } from "../store/favourites";
import {
  fetchShips,
  getShips,
  getShipsInfo,
  getShipsLoadingStatus,
} from "../store/ships";
import { getIsLogIn } from "../store/user";

const Ships = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const collectionShipsData = useSelector(getShips());
  const isLoading = useSelector(getShipsLoadingStatus());
  const collectionShipsInfo = useSelector(getShipsInfo());

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  useEffect(() => {
    dispatch(fetchShips(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (!isLoading && collectionShipsInfo.pages < currentPage) {
      setCurrentPage(1);
      navigate(location.pathname);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLogIn && !isLoading) dispatch(loadFavouritesList());
  }, [isLogIn, isLoading, dispatch]);

  const handlePageChange = (pageIndex) => {
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
      dispatch(fetchShips(pageIndex));
    }
  };

  return !isLoading ? (
    <CollectionPage
      collection={collectionShipsData}
      isLoading={isLoading}
      currentPage={currentPage}
      count={collectionShipsInfo.count}
      pages={collectionShipsInfo.pages}
      pathName={location.pathname}
      onPageChange={handlePageChange}
    />
  ) : (
    <SkeletonCollectionPage />
  );
};

export default Ships;
