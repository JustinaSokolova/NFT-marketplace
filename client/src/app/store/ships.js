import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import config from "../config.json";
import localStorageService from "../services/localStorage.service";
import shipsService from "../services/ships.service";

import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";

export const fetchShips = createAsyncThunk(
  "ships/fetchShips",
  async (currentPage, { getState }) => {
    let content;
    const { ships } = getState();
    content = await shipsService.get(
      currentPage,
      config.pageSize,
      ships.attributesFilters.marketplaceState,
      ships.attributesFilters.rarity,
      ships.attributesFilters.priceOrder
    );
    return content;
  }
);

const shipsSlice = createSlice({
  name: "ships",
  initialState: {
    entities: [],
    entitiesInfo: null,
    isLoading: true,
    error: null,
    attributesFilters: {
      marketplaceState: localStorageService.getFilterMarketState()
        ? localStorageService.getFilterMarketState()
        : null,
      rarity: localStorageService.getCollectionFilterRarity()
        ? localStorageService.getCollectionFilterRarity()
        : [],
      priceOrder: localStorageService.getFilterPriceOrder()
        ? localStorageService.getFilterPriceOrder()
        : null,
    },
  },
  reducers: {
    addFilterAttributes: (state, action) => {
      state.attributesFilters.marketplaceState =
        action.payload.marketplaceState;
      state.attributesFilters.rarity = action.payload.rarityList;
      state.attributesFilters.priceOrder = action.payload.priceOrder;
    },
    clearFilterAttributes: (state) => {
      state.attributesFilters.marketplaceState = null;
      state.attributesFilters.rarity = [];
      state.attributesFilters.priceOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShips.fulfilled, (state, action) => {
        state.entities = action.payload.result;
        state.entitiesInfo = action.payload.info;
        state.isLoading = false;
      })
      .addCase(fetchShips.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        const favourites = action.payload;
        if (state.entities) {
          state.entities.forEach((entity) => {
            const isFavourite = favourites.some(
              (fav) =>
                entity.tokenId === fav.tokenId &&
                entity.contractAddress === fav.contractAddress
            );
            if (isFavourite) {
              entity.favourite = true;
            }
          });
        }
      })
      .addCase(removeFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        const index = state.entities.findIndex(
          (item) =>
            item.tokenId === tokenId && item.contractAddress === contractAddress
        );
        if (index !== -1) {
          state.entities[index].favourite = false;
        }
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        const index = state.entities.findIndex(
          (item) =>
            item.tokenId === tokenId && item.contractAddress === contractAddress
        );
        if (index !== -1) {
          state.entities[index].favourite = true;
        }
      });
  },
});

const { reducer: shipsReducer, actions } = shipsSlice;
const { addFilterAttributes, clearFilterAttributes } = actions;

export const setFilterAttributes = (payload) => (dispatch) => {
  console.log(payload);
  localStorageService.setFilterMarketState(payload.marketplaceState);
  localStorageService.setCollectionFilterRarity(payload.rarityList);
  localStorageService.setFilterPriceOrder(payload.priceOrder);
  dispatch(addFilterAttributes(payload));
};

export const removeFilterAttributes = () => (dispatch) => {
  localStorageService.removeFilterData();
  dispatch(clearFilterAttributes());
};

export const getShips = () => (state) => state.ships.entities;
export const getShipsInfo = () => (state) => state.ships.entitiesInfo;

export const getShipsLoadingStatus = () => (state) => state.ships.isLoading;

export default shipsReducer;
