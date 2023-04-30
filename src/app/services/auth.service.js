import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
  baseURL: "https://navy.online/marketplace/auth/",
});

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signUp`, {
      email,
      password,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`signIn`, {
      email,
      password,
    });
    return data;
  },
  loginWeb3: async ({ ethAddress, signedMessage }) => {
    const { data } = await httpAuth.post(`signIn`, {
      ethAddress,
      signedMessage,
    });
    return data;
  },
  registerWeb3: async ({ ethAddress, signedMessage }) => {
    const { data } = await httpAuth.post(`signUp`, {
      ethAddress,
      signedMessage,
    });
    return data;
  },
  updatePassword: async ({ currentPassword, newPassword }) => {
    const { status } = await httpAuth.patch(
      `updatePassword`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return status;
  },
  logout: async () => {
    const { status } = await httpAuth.post(
      `logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return status;
  },
  getUserNft: async () => {
    const { data } = await httpAuth.get(`myNft`, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};

export default authService;
