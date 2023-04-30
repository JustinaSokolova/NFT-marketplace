import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = {
  authToken: localStorageService.getAccessToken()
    ? localStorageService.getAccessToken()
    : null,
  addressWallet: localStorageService.getWallet()
    ? localStorageService.getWallet()
    : null,
  email: null,
  error: null,
  isLogIn: localStorageService.getAccessToken() ? true : false,
  status: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.authToken = action.payload.token;
      state.isLogIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authWalletSuccess: (state, action) => {
      state.addressWallet = action.payload.ethAddress;
      state.authToken = action.payload.token;
      state.isLogIn = true;
    },
    authWalletFailed: (state, action) => {
      state.error = action.payload;
    },
    userLogOut: (state) => {
      state.isLogIn = false;
      state.authToken = null;
      state.addressWallet = null;
    },
    userUpdateRequest: (state) => {
      state.status = false;
    },
    userUpdateSuccess: (state) => {
      state.status = true;
    },
    userUpdateFailed: (state, action) => {
      state.status = false;
      state.error = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;

const {
  authRequestSuccess,
  authRequestFailed,
  authWalletSuccess,
  authWalletFailed,
  userLogOut,
  userUpdateSuccess,
  authRequested,
  clearErrorMessage,
  userUpdateRequest,
  userUpdateFailed,
} = actions;

export { clearErrorMessage };

export const logIn = (payload) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    console.log(data);
    dispatch(authRequestSuccess(data));
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
      dispatch(authRequestSuccess(data));
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
  authService.logout();
  localStorageService.removeAuthData();
  localStorageService.removeWalletData();
  dispatch(userLogOut());
};

export const updateUserPassword = (payload) => async (dispatch) => {
  dispatch(userUpdateRequest());
  try {
    const status = await authService.updatePassword(payload);
    if (status === 200) dispatch(userUpdateSuccess());
  } catch (error) {
    console.log(error);
    const { status, data } = error.response;
    if (status >= 400) {
      const errorMessage = generateAuthError(data.reason);
      console.log(errorMessage);
      dispatch(userUpdateFailed(errorMessage));
    } else {
      console.log(error);
      dispatch(userUpdateFailed(error.message));
    }
    throw error;
  }
};

export const logInMetamask = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.loginWeb3(payload);
    console.log(data);
    localStorageService.setToken(data.token);
    localStorageService.setWallet(data.ethAddress);
    dispatch(authWalletSuccess(data));
  } catch (error) {
    console.log(error);
    const { status, data } = error.response;
    if (status >= 400) {
      const errorMessage = generateAuthError(data.reason);
      console.log(errorMessage);
      dispatch(authWalletFailed(errorMessage));
    } else {
      console.log(error);
      dispatch(authWalletFailed(error.message));
    }
  }
};

export const signUpMetamask = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.registerWeb3(payload);
    console.log(data);
    localStorageService.setToken(data.token);
    localStorageService.setWallet(data.ethAddress);
    dispatch(authWalletSuccess(data));
  } catch (error) {
    console.log(error);
    const { status, data } = error.response;
    if (status >= 400) {
      const errorMessage = generateAuthError(data.reason);
      console.log(errorMessage);
      dispatch(authWalletFailed(errorMessage));
    } else {
      dispatch(authWalletFailed(error.message));
    }
  }
};

export const getIsLogIn = () => (state) => state.user.isLogIn;

export const getUserAuthToken = () => (state) => state.user.authToken;

export const getUserWallet = () => (state) => state.user.addressWallet;

export const getUpdateUserStatus = () => (state) => state.user.status;

export const getAuthError = () => (state) => state.user.error;

export default userReducer;
