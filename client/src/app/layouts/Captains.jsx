import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CollectionPage from "../components/pages/Collection/CollectionPage";
import SkeletonCollectionPage from "../components/ui/skeleton/SkeletonCollectionPage";
import {
  fetchCaptains,
  getCaptains,
  getCaptainsInfo,
  getCaptainsLoadingStatus,
} from "../store/captains";
import { loadFavouritesList } from "../store/favourites";
import { getIsLogIn } from "../store/user";

const Captains = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const collectionCaptainsData = useSelector(getCaptains());
  const isLoading = useSelector(getCaptainsLoadingStatus());
  const collectionCaptainsInfo = useSelector(getCaptainsInfo());

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  useEffect(() => {
    dispatch(fetchCaptains(currentPage));
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (!isLoading && collectionCaptainsInfo.pages < currentPage) {
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
      dispatch(fetchCaptains(pageIndex));
    }
  };

  return !isLoading ? (
    <CollectionPage
      collection={collectionCaptainsData}
      isLoading={isLoading}
      currentPage={currentPage}
      count={collectionCaptainsInfo.count}
      pages={collectionCaptainsInfo.pages}
      pathName={location.pathname}
      onPageChange={handlePageChange}
    />
  ) : (
    <SkeletonCollectionPage />
  );
};

export default Captains;