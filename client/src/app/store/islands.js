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
  "islands/fetchIslands",
  async (currentPage) => {
    let content;
    if (localStorageService.getAccessToken()) {
      content = await islandsService.getIfLogged(currentPage, config.pageSize);
    } else {
      content = await islandsService.get(currentPage, config.pageSize);
    }
    return content;
  }
);

const islandsSlice = createSlice({
  name: "islands",
  initialState: {
    entities: [],
    entitiesInfo: null,
    isLoading: true,
    error: null,
  },
  reducers: {},
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

const { reducer: islandsReducer } = islandsSlice;

export const getIslands = () => (state) => state.islands.entities;
export const getIslandsInfo = () => (state) => state.islands.entitiesInfo;

export const getIslandsLoadingStatus = () => (state) => state.islands.isLoading;

export default islandsReducer;
