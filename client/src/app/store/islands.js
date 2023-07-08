import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import config from "../config.json";
import islandsService from "../services/islands.service";
import localStorageService from "../services/localStorage.service";
import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";

export const fetchIslands = createAsyncThunk(
  "Islands/fetchIslands",
  async (currentPage, { getState }) => {
    let content;
    const { Islands } = getState();
    content = await islandsService.get(
      currentPage,
      config.pageSize,
      Islands.attributesFilters.marketplaceState,
      Islands.attributesFilters.rarity,
      Islands.attributesFilters.priceOrder
    );
    return content;
  }
);

const islandsSlice = createSlice({
  name: "Islands",
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
    blockchainType: localStorageService.getBlockchainType()
      ? localStorageService.getBlockchainType()
      : null,
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
      .addCase(fetchIslands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIslands.fulfilled, (state, action) => {
        state.entities = action.payload.result;
        state.entitiesInfo = action.payload.info;
        state.isLoading = false;
      })
      .addCase(fetchIslands.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        const favourites = action.payload;
        if (state.entities) {
          state.entities.forEach((entity) => {
            const isFavourite = favourites.some(
              (fav) =>
                entity.contractAddress === fav.contractAddress &&
                entity.tokenId === fav.tokenId
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
            item.contractAddress === contractAddress && item.tokenId === tokenId
        );
        if (index !== -1) {
          state.entities[index].favourite = false;
        }
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        const index = state.entities.findIndex(
          (item) =>
            item.contractAddress === contractAddress && item.tokenId === tokenId
        );
        if (index !== -1) {
          state.entities[index].favourite = true;
        }
      });
  },
});

const { reducer: islandsReducer, actions } = islandsSlice;
const { addFilterAttributes, clearFilterAttributes } = actions;

export const setFilterAttributes = (payload) => (dispatch) => {
  localStorageService.setFilterMarketState(payload.marketplaceState);
  localStorageService.setCollectionFilterRarity(payload.rarityList);
  localStorageService.setFilterPriceOrder(payload.priceOrder);
  dispatch(addFilterAttributes(payload));
};

export const removeFilterAttributes = () => (dispatch) => {
  localStorageService.removeFilterData();
  dispatch(clearFilterAttributes());
};

export const getIslands = () => (state) => state.Islands.entities;
export const getIslandsInfo = () => (state) => state.Islands.entitiesInfo;

export const getIslandsLoadingStatus = () => (state) => state.Islands.isLoading;

export default islandsReducer;
