import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const shipsEndpoint =
  "collection/0x61a03eed4c0220bb6ee89b0cda10dc171f772578/all";

const shipsService = {
  get: async (page, size) => {
    const { data } = await httpService.get(shipsEndpoint, {
      params: { page, size },
    });
    return data;
  },

  getIfLogged: async (page, size) => {
    const { data } = await httpService.get(shipsEndpoint, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};
export default shipsService;
