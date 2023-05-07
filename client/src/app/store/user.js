import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";
import { toast } from "react-toastify";

const initialState = {
  authToken: localStorageService.getAccessToken()
    ? localStorageService.getAccessToken()
    : null,
  addressWallet: localStorageService.getWallet()
    ? localStorageService.getWallet()
    : null,
  attachedWalletAddress: localStorageService.getAttachedWalletAddress()
    ? localStorageService.getAttachedWalletAddress()
    : null,
  email: localStorageService.getEmailAddress()
    ? localStorageService.getEmailAddress()
    : null,
  error: null,
  isLogIn: localStorageService.getAccessToken() ? true : false,
  status: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.authToken = action.payload.token;
      state.email = action.payload.email;
      if (action.payload.ethAddress) {
        state.attachedWalletAddress = action.payload.ethAddress;
      }
      state.isLogIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authWalletSuccess: (state, action) => {
      state.addressWallet = action.payload.ethAddress;
      state.authToken = action.payload.token;
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      state.isLogIn = true;
    },
    authWalletFailed: (state, action) => {
      state.error = action.payload;
    },
    attachWalletSuccess: (state, action) => {
      state.addressWallet = action.payload.ethAddress;
      state.email = action.payload.email;
      state.isLogIn = true;
    },
    attachWalletFailed: (state, action) => {
      state.error = action.payload;
    },
    userLogOut: (state) => {
      state.isLogIn = false;
      state.authToken = null;
      state.addressWallet = null;
      state.attachedWalletAddress = null;
      state.email = null;
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
  attachWalletSuccess,
  attachWalletFailed,
} = actions;

export { clearErrorMessage };

export const logIn =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setToken(data.token);
      localStorageService.setEmailAddress(data.email);
      if (data.ethAddress) {
        localStorageService.setAttachedWalletAddress(data.ethAddress);
      }
      dispatch(authRequestSuccess(data));
    } catch (error) {
      const { status, data } = error.response;
      if (status >= 400) {
        const errorMessage = generateAuthError(data.reason);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
      throw error;
    }
  };

export const signUp =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setToken(data.token);
      localStorageService.setEmailAddress(data.email);
      dispatch(authRequestSuccess(data));
    } catch (error) {
      const { status, data } = error.response;
      if (status >= 400) {
        const errorMessage = generateAuthError(data.reason);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
      throw error;
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
    if (data.email) {
      localStorageService.setEmailAddress(data.email);
    }
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
    throw error;
  }
};

export const signUpMetamask = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.registerWeb3(payload);
    console.log(data);
    localStorageService.setToken(data.token);
    localStorageService.setWallet(data.ethAddress);
    if (data.email) {
      localStorageService.setEmailAddress(data.email);
    }
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
    throw error;
  }
};

export const attachMetamask = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.attachWallet(payload);
    console.log(data);
    localStorageService.setWallet(data.ethAddress);
    localStorageService.setEmailAddress(data.email);
    dispatch(attachWalletSuccess(data));
  } catch (error) {
    console.log(error);
    const { status, data } = error.response;
    if (status >= 400) {
      const errorMessage = generateAuthError(data.reason);
      console.log(errorMessage);
      dispatch(attachWalletFailed(errorMessage));
      toast.error(errorMessage);
    } else {
      dispatch(attachWalletFailed(error.message));
    }
  }
};

export const getIsLogIn = () => (state) => state.user.isLogIn;

export const getUserAuthToken = () => (state) => state.user.authToken;

export const getUserWallet = () => (state) => state.user.addressWallet;

export const getUserEmail = () => (state) => state.user.email;

export const getUserAttachedWallet = () => (state) =>
  state.user.attachedWalletAddress;

export const getUpdateUserStatus = () => (state) => state.user.status;

export const getAuthError = () => (state) => state.user.error;

export default userReducer;
