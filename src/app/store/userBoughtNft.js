import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

const userNftSlice = createSlice({
  name: "userNft",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    // lastFetch: null,
  },
  reducers: {
    userNftRequested: (state) => {
      state.isLoading = true;
    },
    userNftRequestSuccess: (state, action) => {
      state.entities = action.payload;
      // state.lastFetch = Date.now();
      state.isLoading = false;
    },
    userNftRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: userNftReducer, actions } = userNftSlice;
const { userNftRequested, userNftRequestSuccess, userNftRequestFailed } =
  actions;

export const loadUserNftList = () => async (dispatch) => {
  dispatch(userNftRequested());
  try {
    const content = await authService.getUserNft();
    console.log(content);
    dispatch(userNftRequestSuccess(content));
  } catch (error) {
    dispatch(userNftRequestFailed(error.message));
  }
};

export const getUserNftList = () => (state) => state.userNft.entities;

export const getUserNftLoadingStatus = () => (state) => state.userNft.isLoading;

export const getUserNftByIds = (id) => (state) => {
  if (state.userNft.entities) {
    return state.userNft.entities.find((n) => n._id === id);
  }
};

export default userNftReducer;
