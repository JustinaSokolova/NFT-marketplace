import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const shipsEndpoint =
  "collection/0x7e77efa1050aac8e12bee238c596d1561231e2ee/all";

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
