import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import faqService from "../services/faq.service";

export const fetchFaq = createAsyncThunk("faq/fetchFaq", async () => {
  const content = await faqService.get();
  return content;
});

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFaq.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFaq.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const { reducer: faqReducer } = faqSlice;

export const getFaq = () => (state) => state.faq.entities;

export const getFaqLoadingStatus = () => (state) => state.faq.isLoading;

export default faqReducer;
