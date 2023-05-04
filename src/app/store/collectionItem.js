import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import collItemService from "../services/collectionItem.service";
import { getIsLogIn } from "./user";

export const fetchCollectionItem = createAsyncThunk(
  "collectionItem/fetchCollectionItem",
  async (payload) => {
    console.log(payload);
    let content;
    if (getIsLogIn()) {
      content = await collItemService.getIfLogged(payload);
    } else {
      content = await collItemService.get(payload);
    }
    console.log(content);
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
