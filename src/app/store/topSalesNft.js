import { createSlice } from "@reduxjs/toolkit";
import topSalesNftService from "../services/topSalesNft.service";

const topSalesNftSlice = createSlice({
  name: "topSalesNft",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    topSalesNftRequest: (state) => {
      state.isLoading = true;
    },
    topSalesNftReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    topSalesNftRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: topSalesNftReducer, actions } = topSalesNftSlice;
const { topSalesNftRequest, topSalesNftReceived, topSalesNftRequestFailed } =
  actions;

export const loadTopSalesNftList = (payload) => async (dispatch) => {
  dispatch(topSalesNftRequest());
  try {
    const content = await topSalesNftService.get(payload);
    dispatch(topSalesNftReceived(content));
  } catch (error) {
    dispatch(topSalesNftRequestFailed(error.message));
  }
};

export const getTopSalesNft = () => (state) => state.topSalesNft.entities;

export const getTopSalesNftLoadingStatus = () => (state) =>
  state.topSalesNft.isLoading;

export default topSalesNftReducer;
