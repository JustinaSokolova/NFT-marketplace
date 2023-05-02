import { createSlice, createAction } from "@reduxjs/toolkit";
import favouritesService from "../services/favourites.services";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    favouritesRequested: (state) => {
      state.isLoading = true;
    },
    favouritesRequestSuccess: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    favouritesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    favouritesAddSuccess: (state, action) => {
      state.entities.push(action.payload);
    },
    addFavouritesFailed: (state, action) => {
      state.error = action.payload;
    },
    favouritesRemoveSuccess: (state, action) => {
      state.entities = state.entities.filter((item) => {
        // console.log(item.tokenId, item.contractAddress, action.payload);
        console.log(
          item.tokenId !== action.payload.tokenId,
          item.contractAddress !== action.payload.contractAddress
        );
        // console.log(
        //   item.tokenId !== action.payload.tokenId &&
        //     item.contractAddress !== action.payload.contractAddress
        // );
        return (
          item.tokenId !== action.payload.tokenId ||
          item.contractAddress !== action.payload.contractAddress
        );
      });
    },
    removeFavouritesFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: favouritesReducer, actions } = favouritesSlice;
const {
  favouritesRequested,
  favouritesRequestSuccess,
  favouritesRequestFailed,
  favouritesAddSuccess,
  addFavouritesFailed,
  favouritesRemoveSuccess,
  removeFavouritesFailed,
} = actions;

const favouritesAddRequested = createAction(
  "favourites/favouritesAddRequested"
);
const favouritesRemoveRequested = createAction(
  "favourites/favouritesRemoveRequested"
);

export const loadFavouritesList = () => async (dispatch) => {
  // {contractAddress, tokenId} = payload;
  dispatch(favouritesRequested());
  try {
    const content = await favouritesService.getFavouritesNft();
    dispatch(favouritesRequestSuccess(content));
  } catch (error) {
    dispatch(favouritesRequestFailed(error.message));
  }
};

export const addFavourites = (payload) => async (dispatch) => {
  dispatch(favouritesAddRequested());
  try {
    const { data, status } = await favouritesService.addFavouritesNft(payload);
    if (status === 200) dispatch(favouritesAddSuccess(data));
  } catch (error) {
    dispatch(addFavouritesFailed(error.message));
  }
};

export const removeFavourites = (payload) => async (dispatch, getState) => {
  dispatch(favouritesRemoveRequested());
  try {
    const status = await favouritesService.removeFavouritesNft(payload);

    if (status === 200) dispatch(favouritesRemoveSuccess(payload));
  } catch (error) {
    dispatch(removeFavouritesFailed(error.message));
  }
};

export const getFavourites = () => (state) => state.favourites.entities;
export const getFavouritesLoadingStatus = () => (state) =>
  state.favourites.isLoading;

export default favouritesReducer;
