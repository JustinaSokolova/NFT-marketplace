import { combineReducers, configureStore } from "@reduxjs/toolkit";
import captainsReducer from "./captains";
import islandsReducer from "./islands";
import shipsReducer from "./ships";
import userReducer from "./user";

const rootReducer = combineReducers({
  captains: captainsReducer,
  islands: islandsReducer,
  ships: shipsReducer,
  user: userReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
