import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import collItemService from "../services/collectionItem.service";
import localStorageService from "../services/localStorage.service";

export const fetchCollectionItem = createAsyncThunk(
  "collectionItem/fetchCollectionItem",
  async (payload) => {
    let content;
    if (localStorageService.getAccessToken()) {
      content = await collItemService.getIfLogged(payload);
    } else {
      content = await collItemService.get(payload);
    }
    return content;
  }
);

const collectionItemSlice = createSlice({
  name: "collectionItem",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCollectionItem.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCollectionItem.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const { reducer: collectionItemReducer } = collectionItemSlice;

export const getCollectionItem = () => (state) => state.collectionItem.entities;

export const getCollectionItemLoadingStatus = () => (state) =>
  state.collectionItem.isLoading;

export default collectionItemReducer;
