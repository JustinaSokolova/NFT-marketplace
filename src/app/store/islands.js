import { createSlice } from "@reduxjs/toolkit";

import config from "../config.json";
import islandsService from "../services/islands.service";

const islandsSlice = createSlice({
  name: "islands",
  initialState: {
    entities: null,
    entitiesInfo: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    islandsRequested: (state) => {
      state.isLoading = true;
    },
    islandsReceived: (state, action) => {
      state.entities = action.payload.result;
      state.entitiesInfo = action.payload.info;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    islandsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: islandsReducer, actions } = islandsSlice;
const { islandsRequested, islandsReceived, islandsRequestFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadIslandsList = (currentPage) => async (dispatch, getState) => {
  // const { lastFetch } = getState().islands;
  // if (isOutdated(lastFetch)) {
  dispatch(islandsRequested());
  try {
    const content = await islandsService.get(currentPage, config.pageSize);
    dispatch(islandsReceived(content));
  } catch (error) {
    dispatch(islandsRequestFailed(error.message));
  }
  // }
};

export const getIslands = () => (state) => state.islands.entities;
export const getIslandsInfo = () => (state) => state.islands.entitiesInfo;

export const getIslandsLoadingStatus = () => (state) => state.islands.isLoading;

export const getIslandsByIds = (id) => (state) => {
  if (state.islands.entities) {
    return state.islands.entities.find((p) => p._id === id);
  }
};

export default islandsReducer;
