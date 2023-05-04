import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import config from "../config.json";
import shipsService from "../services/ships.service";

import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";
import { getIsLogIn } from "./user";

export const fetchShips = createAsyncThunk(
  "ships/fetchShips",
  async (currentPage) => {
    let content;
    if (getIsLogIn()) {
      content = await shipsService.getIfLogged(currentPage, config.pageSize);
    } else {
      content = await shipsService.get(currentPage, config.pageSize);
    }
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
  },
  reducers: {},
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

const { reducer: shipsReducer } = shipsSlice;

export const getShips = () => (state) => state.ships.entities;
export const getShipsInfo = () => (state) => state.ships.entitiesInfo;

export const getShipsLoadingStatus = () => (state) => state.ships.isLoading;

export default shipsReducer;
