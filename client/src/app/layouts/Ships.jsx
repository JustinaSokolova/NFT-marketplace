import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CollectionItems from "../components/pages/Collection/CollectionItems";
import SkeletonCollectionItems from "../components/ui/skeleton/SkeletonCollectionItems";

import { loadFavouritesList } from "../store/favourites";
import {
  fetchShips,
  getShips,
  getShipsInfo,
  getShipsLoadingStatus,
  removeFilterAttributes,
  setFilterAttributes,
} from "../store/ships";
import { getIsLogIn } from "../store/user";
import localStorageService from "../services/localStorage.service";
import { Box } from "@mui/material";
import ChooseBlockchain from "../components/pages/Collection/ChooseBlockchain";
import FilterGroup from "../components/pages/Collection/FilterGroup";
import BoxContainer from "../components/common/BoxContainer";

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

  const filterNames = ["Common", "Rare", "Epic", "Legendary"];
  const [rarityList, setRarityList] = useState(
    localStorageService.getCollectionFilterRarity() || []
  );
  const [priceOrder, setPriceOrder] = useState("");

  const [marketplaceState, setMarketplaceState] = useState("");
  const [stateSwitch, setStateSwitch] = useState({
    isSale: false,
  });

  const [selectedBlockchain, setSelectedBlockchain] = useState(
    localStorageService.getBlockchainType() || "venom"
  );

  const handleSelectedBlockchain = (value) => {
    setSelectedBlockchain(value);
    localStorageService.setBlockchainType(value);
    dispatch(fetchShips(currentPage));
  };

  const handleChangeMarketState = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (stateSwitch.isSale === true) {
      setMarketplaceState("Listed");
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
    dispatch(fetchShips(currentPage));
  }, [
    currentPage,
    marketplaceState,
    rarityList,
    priceOrder,
    stateSwitch,
    dispatch,
  ]);

  useEffect(() => {
    if (
      !isLoading &&
      collectionShipsData.length > 0 &&
      collectionShipsInfo.pages < currentPage
    ) {
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

  const handleClear = () => {
    dispatch(removeFilterAttributes());
    setCurrentPage(1);
    dispatch(fetchShips(currentPage));
    setRarityList([]);
    setPriceOrder("");
    setStateSwitch({
      ...stateSwitch,
      isSale: false,
    });
  };

  return (
    <>
      <BoxContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "42px",
          }}
        >
          <Box>
            <ChooseBlockchain
              selectedBlockchain={selectedBlockchain}
              onButtonSelectBlockchain={handleSelectedBlockchain}
            />
          </Box>
          <Box>
            <FilterGroup
              filterNames={filterNames}
              rarityList={rarityList}
              onFilterChange={handleChangeFilter}
              onHandleClear={handleClear}
              stateSwitch={stateSwitch}
              onMarketStateChange={handleChangeMarketState}
              onChangePrice={handleChangePrice}
              priceOrder={priceOrder}
            />
          </Box>
        </Box>
        {!isLoading && collectionShipsData.length <= 0 && (
          <Box sx={{ m: "24px" }}>There are no NFTs with these parameters</Box>
        )}
        <Box sx={{ mt: "42px" }}>
          {!isLoading ? (
            <CollectionItems
              collection={collectionShipsData}
              isLoading={isLoading}
              currentPage={currentPage}
              count={collectionShipsInfo.count}
              pages={collectionShipsInfo.pages}
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
              onButtonSelectBlockchain={handleSelectedBlockchain}
              selectedBlockchain={selectedBlockchain}
            />
          ) : (
            <SkeletonCollectionItems />
          )}
        </Box>
      </BoxContainer>
    </>
  );
};

export default Ships;
