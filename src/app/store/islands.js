import { createSlice } from "@reduxjs/toolkit";
import islandsService from "../services/islands.service";
import config from "../config.json";

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
    islandsReceved: (state, action) => {
      state.entities = action.payload.result;
      state.entitiesInfo = action.payload.info;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    islandsRequesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: islandsReducer, actions } = islandsSlice;
const { islandsRequested, islandsReceved, islandsRequesFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadIslandsList =
  (currentPage = 1) =>
  async (dispatch, getState) => {
    const { lastFetch } = getState().islands;
    if (isOutdated(lastFetch)) {
      dispatch(islandsRequested());
      try {
        const content = await islandsService.get(currentPage, config.pageSize);
        console.log(content);
        dispatch(islandsReceved(content));
      } catch (error) {
        dispatch(islandsRequesFailed(error.message));
      }
    }
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
