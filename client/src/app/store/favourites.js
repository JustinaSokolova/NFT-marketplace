import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favouritesService from "../services/favourites.services";
import { fetchCaptains } from "./captains";
import { fetchIslands } from "./islands";
import { fetchShips } from "./ships";

export const loadFavouritesList = createAsyncThunk(
  "favourites/loadFavouritesList",
  async () => {
    const content = await favouritesService.getFavouritesNft();
    return content;
  }
);

export const addFavourites = createAsyncThunk(
  "favourites/addFavourites",
  async (payload) => {
    const { contractAddress, tokenId } = payload;
    const { data, status } = await favouritesService.addFavouritesNft({
      contractAddress,
      tokenId,
    });
    if (status === 200) return data;
    throw new Error("Failed to add favourite");
  }
);

export const removeFavourites = createAsyncThunk(
  "favourites/removeFavourites",
  async (payload) => {
    const { contractAddress, tokenId } = payload;
    const status = await favouritesService.removeFavouritesNft({
      contractAddress,
      tokenId,
    });
    if (status === 200) return payload;
    throw new Error("Failed to remove favourite");
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavouritesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavouritesList.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(addFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        state.entities.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addFavourites.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(removeFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavourites.fulfilled, (state, action) => {
        state.entities = state.entities.filter((item) => {
          return (
            item.contractAddress !== action.payload.contractAddress ||
            item.tokenId !== action.payload.tokenId
          );
        });
        state.isLoading = false;
      })
      .addCase(removeFavourites.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
    // .addCase(fetchCaptains.fulfilled, (state, action) => {
    //   const captains = action.payload.result;
    //   if (captains) {
    //     captains.forEach((captain) => {
    //       const isFavorite = state.entities.some(
    //         (fav) =>
    //           captain.contractAddress === fav.contractAddress &&
    //           captain.tokenId === fav.tokenId
    //       );
    //       if (isFavorite) {
    //         return;
    //       }
    //       state.entities.push(captain);
    //     });
    //   }
    // })
    // .addCase(fetchShips.fulfilled, (state, action) => {
    //   const ships = action.payload.result;
    //   if (ships) {
    //     ships.forEach((ship) => {
    //       const isFavorite = state.entities.some(
    //         (fav) =>
    //           ship.contractAddress === fav.contractAddress &&
    //           ship.tokenId === fav.tokenId
    //       );
    //       if (isFavorite) {
    //         return;
    //       }
    //       state.entities.push(ship);
    //     });
    //   }
    // })
    // .addCase(fetchIslands.fulfilled, (state, action) => {
    //   const islands = action.payload.result;
    //   if (islands) {
    //     islands.forEach((island) => {
    //       const isFavorite = state.entities.some(
    //         (fav) =>
    //           island.contractAddress === fav.contractAddress &&
    //           island.tokenId === fav.tokenId
    //       );
    //       if (isFavorite) {
    //         return;
    //       }
    //       state.entities.push(island);
    //     });
    //   }
    // });
  },
});

const { reducer: favouritesReducer, actions } = favouritesSlice;

export const getFavourites = () => (state) => state.favourites.entities;
export const getFavouritesLoadingStatus = () => (state) =>
  state.favourites.isLoading;

export default favouritesReducer;
