import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mintService from "../services/mint.service";

export const fetchMintInfo = createAsyncThunk(
  "mintInfo/fetchMintInfo",
  async () => {
    const content = await mintService.get();
    return content;
  }
);

const mintInfoSlice = createSlice({
  name: "mintInfo",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMintInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMintInfo.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMintInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const { reducer: mintInfoReducer } = mintInfoSlice;

export const getMintInfo = () => (state) => state.mintInfo.entities;

export const getMintInfoLoadingStatus = () => (state) =>
  state.mintInfo.isLoading;

export default mintInfoReducer;
