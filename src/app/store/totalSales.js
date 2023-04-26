import { createSlice } from "@reduxjs/toolkit";
import totalSalesService from "../services/totalSales.service";

const totalSalesSlice = createSlice({
  name: "totalSales",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    // lastFetch: null,
  },
  reducers: {
    totalSalesRequested: (state) => {
      state.isLoading = true;
    },
    totalSalesReceived: (state, action) => {
      state.entities = action.payload;
      // state.lastFetch = Date.now();
      state.isLoading = false;
    },
    totalSalesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: totalSalesReducer, actions } = totalSalesSlice;
const { totalSalesRequested, totalSalesReceived, totalSalesRequestFailed } =
  actions;

// function isOutdated(date) {
//   if (Date.now() - date > 10 * 60 * 1000) {
//     return true;
//   }
//   return false;
// }

export const loadTotalSalesList = (payload) => async (dispatch) => {
  console.log(11);
  dispatch(totalSalesRequested());
  try {
    const content = await totalSalesService.get(payload);
    dispatch(totalSalesReceived(content));
  } catch (error) {
    dispatch(totalSalesRequestFailed(error.message));
  }
};

export const getTotalSales = () => (state) => state.totalSales.entities; // ф-ии селекторы
export const getTotalSalesInfo = () => (state) => state.totalSales.entitiesInfo;

export const getTotalSalesLoadingStatus = () => (state) =>
  state.totalSales.isLoading;

export const getTotalSalesByIds = (id) => (state) => {
  if (state.totalSales.entities) {
    return state.totalSales.entities.find((p) => p._id === id);
  }
};

export default totalSalesReducer;
