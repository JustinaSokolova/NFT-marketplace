import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import captainsService from "../services/captains.service";
import config from "../config.json";
import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";
import localStorageService from "../services/localStorage.service";

export const fetchCaptains = createAsyncThunk(
  "captains/fetchCaptains",
  async (currentPage, { getState }) => {
    let content;
    const { captains } = getState();
    content = await captainsService.get(
      currentPage,
      config.pageSize,
      captains.attributesFilters.marketplaceState,
      captains.attributesFilters.rarity,
      captains.attributesFilters.priceOrder
    );
    return content;
  }
);

const captainsSlice = createSlice({
  name: "captains",
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
      .addCase(fetchCaptains.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCaptains.fulfilled, (state, action) => {
        state.entities = action.payload.result;
        state.entitiesInfo = action.payload.info;
        state.isLoading = false;
      })
      .addCase(fetchCaptains.rejected, (state, action) => {
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

const { reducer: captainsReducer, actions } = captainsSlice;
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

export const getCaptains = () => (state) => state.captains.entities;
export const getCaptainsInfo = () => (state) => state.captains.entitiesInfo;

export const getCaptainsLoadingStatus = () => (state) =>
  state.captains.isLoading;

export default captainsReducer;
