import { createSlice } from "@reduxjs/toolkit";
import shipsService from "../services/ships.service";
import config from "../config.json";

const shipsSlice = createSlice({
  name: "ships",
  initialState: {
    entities: null,
    entitiesInfo: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    shipsRequested: (state) => {
      state.isLoading = true;
    },
    shipsReceved: (state, action) => {
      state.entities = action.payload.result;
      state.entitiesInfo = action.payload.info;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    shipsRequesFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: shipsReducer, actions } = shipsSlice;
const { shipsRequested, shipsReceved, shipsRequesFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadShipsList =
  (currentPage = 1) =>
  async (dispatch, getState) => {
    const { lastFetch } = getState().ships;
    if (isOutdated(lastFetch)) {
      dispatch(shipsRequested());
      try {
        const content = await shipsService.get(currentPage, config.pageSize);
        console.log(content);
        dispatch(shipsReceved(content));
      } catch (error) {
        dispatch(shipsRequesFailed(error.message));
      }
    }
  };

export const getShips = () => (state) => state.ships.entities;
export const getShipsInfo = () => (state) => state.ships.entitiesInfo;

export const getShipsLoadingStatus = () => (state) => state.ships.isLoading;

export const getShipsByIds = (id) => (state) => {
  if (state.ships.entities) {
    return state.ships.entities.find((p) => p._id === id);
  }
};

export default shipsReducer;
