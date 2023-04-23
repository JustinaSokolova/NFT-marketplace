import { createSlice } from "@reduxjs/toolkit";
import captainsService from "../services/captains.service";
import config from "../config.json";

const captainsSlice = createSlice({
  name: "captains",
  initialState: {
    entities: null,
    entitiesInfo: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    captainsRequested: (state) => {
      state.isLoading = true;
    },
    captainsReceved: (state, action) => {
      state.entities = action.payload.result;
      state.entitiesInfo = action.payload.info;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    captainsRequesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: captainsReducer, actions } = captainsSlice;
const { captainsRequested, captainsReceved, captainsRequesFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadCaptainsList =
  (currentPage = 1) =>
  async (dispatch, getState) => {
    const { lastFetch } = getState().captains;
    if (isOutdated(lastFetch)) {
      dispatch(captainsRequested());
      try {
        const content = await captainsService.get(currentPage, config.pageSize);
        console.log(content);
        dispatch(captainsReceved(content));
      } catch (error) {
        dispatch(captainsRequesFailed(error.message));
      }
    }
  };

export const getCaptains = () => (state) => state.captains.entities;
export const getCaptainsInfo = () => (state) => state.captains.entitiesInfo;

export const getCaptainsLoadingStatus = () => (state) =>
  state.captains.isLoading;

export const getCaptainsByIds = (id) => (state) => {
  if (state.captains.entities) {
    return state.captains.entities.find((p) => p._id === id);
  }
};

export default captainsReducer;
