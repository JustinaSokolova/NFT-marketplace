import { combineReducers, configureStore } from "@reduxjs/toolkit";
import captainsReducer from "./captains";
import islandsReducer from "./islands";
import shipsReducer from "./ships";

const rootReducer = combineReducers({
  captains: captainsReducer,
  islands: islandsReducer,
  ships: shipsReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
