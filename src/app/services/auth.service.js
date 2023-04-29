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
  updatePassword: async (password) => {
    const { data } = await httpAuth.post(
      `updatePassword`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return data;
  },
  logout: async () => {
    console.log(localStorageService.getAccessToken());
    const { status } = await httpAuth.post(
      `logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    console.log(status);
    return status;
  },
};

export default authService;
