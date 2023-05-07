import { combineReducers, configureStore } from "@reduxjs/toolkit";
import captainsReducer from "./captains";
import collectionItemReducer from "./collectionItem";
import faqReducer from "./faq";
import favouritesReducer from "./favourites";
import islandsReducer from "./islands";
import mintInfoReducer from "./mintInfo";
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
  favourites: favouritesReducer,
  mintInfo: mintInfoReducer,
  collectionItem: collectionItemReducer,
  faq: faqReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
