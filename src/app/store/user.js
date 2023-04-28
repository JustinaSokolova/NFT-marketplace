import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      authToken: localStorageService.getAccessToken(),
      wallet: null,
      error: null,
      isLogIn: true,
      status: false,
    }
  : {
      authToken: null,
      wallet: null,
      error: null,
      isLogIn: false,
      status: false,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.authToken = action.payload;
      state.isLogIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authWallet: (state, action) => {
      state.wallet = action.payload;
      state.isLogIn = true;
    },
    userLogOut: (state) => {
      state.isLogIn = false;
      state.authToken = null;
    },
    userUpdateSuccess: (state) => {
      state.status = true;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

const {
  authRequestSuccess,
  authRequestFailed,
  authWallet,
  userLogOut,
  userUpdateSuccess,
  authRequested,
} = actions;

const userUpdateRequested = createAction("user/userUpdateRequested");
const updateUserFailed = createAction("user/updateUserFailed");

export const logIn = (payload) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    console.log(data);
    dispatch(authRequestSuccess(data.token));
    localStorageService.setToken(data.token);
  } catch (error) {
    console.log(error);
    const { status, data } = error.response;
    if (status >= 400) {
      const errorMessage = generateAuthError(data.reason);
      console.log(errorMessage);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setToken(data.token);
      dispatch(authRequestSuccess(data.token));
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code >= 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLogOut());
};

export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { status } = await authService.updatePassword(payload);
    if (status === 200) dispatch(userUpdateSuccess());
  } catch (error) {
    dispatch(updateUserFailed(error.message));
  }
};

export const getIsLogIn = () => (state) => state.user.isLogIn;

export const getUserAuthToken = () => (state) => state.user.authToken;

export const getUserWallet = () => (state) => state.user.wallet;

export const getAuthError = () => (state) => state.user.error;

export default userReducer;
