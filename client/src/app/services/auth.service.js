import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpService.post(`auth/signUp`, {
      email,
      password,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpService.post(`auth/signIn`, {
      email,
      password,
    });
    return data;
  },
  loginWeb3: async ({ ethAddress, ethSignedMessage }) => {
    const { data } = await httpService.post(`auth/signIn`, {
      ethAddress,
      ethSignedMessage,
    });
    return data;
  },
  registerWeb3: async ({ ethAddress, ethSignedMessage }) => {
    const { data } = await httpService.post(`auth/signUp`, {
      ethAddress,
      ethSignedMessage,
    });
    return data;
  },
  attachWallet: async ({ ethAddress, ethSignedMessage }) => {
    const { data } = await httpService.post(
      `auth/attachWallet`,
      {
        ethAddress,
        ethSignedMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return data;
  },
  attachEmail: async ({ email, password }) => {
    const { data } = await httpService.post(
      `auth/attachWallet`,
      {
        email,
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
  updatePassword: async ({ currentPassword, newPassword }) => {
    const { status } = await httpService.patch(
      `auth/updatePassword`,
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
    const { status } = await httpService.post(
      `auth/logout`,
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
    const { data } = await httpService.get(`auth/myNft`, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};

export default authService;
