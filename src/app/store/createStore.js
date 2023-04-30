import { combineReducers, configureStore } from "@reduxjs/toolkit";
import captainsReducer from "./captains";
import islandsReducer from "./islands";
import shipsReducer from "./ships";
import topSalesNftReducer from "./topSalesNft";
import totalSalesReducer from "./totalSales";
import userReducer from "./user";
import userNftReducer from "./userBoughtNft";

const rootReducer = combineReducers({
  user: userReducer,
  totalSales: totalSalesReducer,
  topSalesNft: topSalesNftReducer,
  captains: captainsReducer,
  islands: islandsReducer,
  ships: shipsReducer,
  userNft: userNftReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
