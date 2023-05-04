import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const captainsEndpoint =
  "collection/0x7e77efa1050aac8e12bee238c596d1561231e2ed/all";

const captainsService = {
  get: async (page, size) => {
    const { data } = await httpService.get(captainsEndpoint, {
      params: { page, size },
    });
    return data;
  },
  getIfLogged: async (page, size) => {
    const { data } = await httpService.get(captainsEndpoint, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};
export default captainsService;
