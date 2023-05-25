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
  removeFilterAttributes,
  setFilterAttributes,
} from "../store/islands";
import { getIsLogIn } from "../store/user";
import localStorageService from "../services/localStorage.service";

const Islands = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const collectionIslandsData = useSelector(getIslands());
  const isLoading = useSelector(getIslandsLoadingStatus());
  const collectionIslandsInfo = useSelector(getIslandsInfo());

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  const filterNames = ["Common", "Rare", "Epic", "Legendary"];
  const [rarityList, setRarityList] = useState(
    localStorageService.getCollectionFilterRarity() || []
  );
  const [priceOrder, setPriceOrder] = useState("");

  const [marketplaceState, setMarketplaceState] = useState("");
  const [stateSwitch, setStateSwitch] = useState({
    isSale: false,
  });

  const handleChangeMarketState = (event) => {
    console.log("handle");
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (stateSwitch.isSale === true) {
      setMarketplaceState("listed");
    } else {
      setMarketplaceState("");
    }
  }, [stateSwitch]);

  const handleChangeFilter = (event) => {
    const {
      target: { value },
    } = event;
    setRarityList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setCurrentPage(1);
  };

  const handleChangePrice = (event) => {
    setPriceOrder(event.target.value);
  };

  useEffect(() => {
    dispatch(setFilterAttributes({ marketplaceState, rarityList, priceOrder }));
    dispatch(fetchIslands(currentPage));
  }, [
    currentPage,
    marketplaceState,
    rarityList,
    priceOrder,
    stateSwitch,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(fetchIslands(currentPage));
    if (!isLoading && collectionIslandsInfo.pages < currentPage) {
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
      dispatch(fetchIslands(pageIndex));
    }
  };

  const handleClear = () => {
    dispatch(removeFilterAttributes());
    setCurrentPage(1);
    dispatch(fetchIslands(currentPage));
    setRarityList([]);
    setPriceOrder("");
    setStateSwitch({
      ...stateSwitch,
      isSale: false,
    });
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
      filterNames={filterNames}
      rarityList={rarityList}
      onFilterChange={handleChangeFilter}
      onHandleClear={handleClear}
      stateSwitch={stateSwitch}
      onMarketStateChange={handleChangeMarketState}
      priceOrder={priceOrder}
      onChangePrice={handleChangePrice}
    />
  ) : (
    <SkeletonCollectionPage />
  );
};

export default Islands;
