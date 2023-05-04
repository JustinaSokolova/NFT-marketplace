import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import captainsService from "../services/captains.service";
import config from "../config.json";
import {
  addFavourites,
  loadFavouritesList,
  removeFavourites,
} from "./favourites";
import { getIsLogIn } from "./user";

export const fetchCaptains = createAsyncThunk(
  "captains/fetchCaptains",
  async (currentPage) => {
    let content;
    if (getIsLogIn()) {
      content = await captainsService.getIfLogged(currentPage, config.pageSize);
    } else {
      content = await captainsService.get(currentPage, config.pageSize);
    }
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
  },
  reducers: {},
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

const { reducer: captainsReducer } = captainsSlice;

export const getCaptains = () => (state) => state.captains.entities;
export const getCaptainsInfo = () => (state) => state.captains.entitiesInfo;

export const getCaptainsLoadingStatus = () => (state) =>
  state.captains.isLoading;

export default captainsReducer;
