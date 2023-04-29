import { combineReducers, configureStore } from "@reduxjs/toolkit";
import captainsReducer from "./captains";
import islandsReducer from "./islands";
import shipsReducer from "./ships";
import totalSalesReducer from "./totalSales";
import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
  totalSales: totalSalesReducer,
  captains: captainsReducer,
  islands: islandsReducer,
  ships: shipsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
