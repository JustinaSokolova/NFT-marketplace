import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

import topSalesNftService from "../services/topSalesNft.service";

import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";

export const fetchTopSalesVenom = createAsyncThunk(
  "topSalesNft/fetchTopSalesVenom",
  async (payload) => {
    let content;
    if (localStorageService.getAccessToken()) {
      content = await topSalesNftService.getIfLogged(payload);
    } else {
      content = await topSalesNftService.get(payload);
    }
    return content;
  }
);

export const fetchTopSalesCronos = createAsyncThunk(
  "topSalesNft/fetchTopSalesCronos",
  async (payload) => {
    let content;
    if (localStorageService.getAccessToken()) {
      content = await topSalesNftService.getIfLogged(payload);
    } else {
      content = await topSalesNftService.get(payload);
    }
    return content;
  }
);

const topSalesNftSlice = createSlice({
  name: "topSalesNft",
  initialState: {
    entities: {
      venomTopSales: [],
      cronosTopSales: [],
    },
    isLoadingVenom: true,
    isLoadingCronos: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSalesVenom.pending, (state) => {
        state.isLoadingVenom = true;
      })
      .addCase(fetchTopSalesVenom.fulfilled, (state, action) => {
        state.entities.venomTopSales = action.payload.venomTopSales;
        state.isLoadingVenom = false;
      })
      .addCase(fetchTopSalesVenom.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingVenom = false;
      })
      .addCase(fetchTopSalesCronos.pending, (state) => {
        state.isLoadingCronos = true;
      })
      .addCase(fetchTopSalesCronos.fulfilled, (state, action) => {
        state.entities.cronosTopSales = action.payload.cronosTopSales;
        state.isLoadingCronos = false;
      })
      .addCase(fetchTopSalesCronos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoadingCronos = false;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        const favourites = action.payload;
        Object.values(state.entities).forEach((entity) => {
          if (entity) {
            entity.forEach((item) => {
              const isFavourite = favourites.some(
                (fav) =>
                  item.tokenId === fav.tokenId &&
                  item.contractAddress === fav.contractAddress
              );
              if (isFavourite) {
                item.favourite = true;
              }
            });
          }
        });
      })
      .addCase(removeFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        Object.values(state.entities).forEach((entity) => {
          const index = entity.findIndex(
            (item) =>
              item.tokenId === tokenId &&
              item.contractAddress === contractAddress
          );
          if (index !== -1) {
            entity[index].favourite = false;
          }
        });
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        Object.values(state.entities).forEach((entity) => {
          const index = entity.findIndex(
            (item) =>
              item.tokenId === tokenId &&
              item.contractAddress === contractAddress
          );
          if (index !== -1) {
            entity[index].favourite = true;
          }
        });
      });
  },
});

const { reducer: topSalesNftReducer } = topSalesNftSlice;

export const getTopSalesVenom = () => (state) =>
  state.topSalesNft.entities.venomTopSales;

export const getTopSalesCronos = () => (state) =>
  state.topSalesNft.entities.cronosTopSales;

export const getTopSalesVenomLoadingStatus = () => (state) =>
  state.topSalesNft.isLoadingVenom;

export const getTopSalesCronosLoadingStatus = () => (state) =>
  state.topSalesNft.isLoadingCronos;

export default topSalesNftReducer;
