import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";

export const fetchUserNft = createAsyncThunk(
  "userNft/fetchUserNft",
  async () => {
    const content = await authService.getUserNft();
    return content;
  }
);

const userNftSlice = createSlice({
  name: "userNft",
  initialState: {
    captains: {
      total: 0,
      items: [],
    },
    ships: {
      total: 0,
      items: [],
    },
    islands: {
      total: 0,
      items: [],
    },
    isLoading: true,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNft.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserNft.fulfilled, (state, action) => {
        state.captains = action.payload.captains;
        state.ships = action.payload.ships;
        state.islands = action.payload.islands;
        state.isLoading = false;
      })
      .addCase(fetchUserNft.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        const favourites = action.payload;
        Object.values(state).forEach((collection) => {
          if (collection && collection.items) {
            collection.items.forEach((entity) => {
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
        });
      })
      .addCase(removeFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        Object.values(state).forEach((collection) => {
          if (collection && collection.items) {
            const index = collection.items.findIndex(
              (item) =>
                item.tokenId === tokenId &&
                item.contractAddress === contractAddress
            );
            if (index !== -1) {
              collection.items[index].favourite = false;
            }
          }
        });
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        const { contractAddress, tokenId } = action.payload;
        Object.values(state).forEach((collection) => {
          if (collection && collection.items) {
            const index = collection.items.findIndex(
              (item) =>
                item.tokenId === tokenId &&
                item.contractAddress === contractAddress
            );
            if (index !== -1) {
              collection.items[index].favourite = true;
            }
          }
        });
      });
  },
});

const { reducer: userNftReducer } = userNftSlice;

export const getUserNftCaptains = () => (state) => state.userNft.captains;
export const getUserNftShips = () => (state) => state.userNft.ships;
export const getUserNftIslands = () => (state) => state.userNft.islands;

export const getUserNftLoadingStatus = () => (state) => state.userNft.isLoading;

export default userNftReducer;
