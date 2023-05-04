import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import topSalesNftService from "../services/topSalesNft.service";

import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";
import { getIsLogIn } from "./user";

export const fetchTopSalesNft = createAsyncThunk(
  "topSalesNft/fetchTopSalesNft",
  async (payload) => {
    let content;
    if (getIsLogIn()) {
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
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopSalesNft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTopSalesNft.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTopSalesNft.rejected, (state, action) => {
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

const { reducer: topSalesNftReducer } = topSalesNftSlice;

export const getTopSalesNft = () => (state) => state.topSalesNft.entities;

export const getTopSalesNftLoadingStatus = () => (state) =>
  state.topSalesNft.isLoading;

export default topSalesNftReducer;
