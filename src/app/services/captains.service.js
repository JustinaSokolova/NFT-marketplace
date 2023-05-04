import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const captainsEndpoint =
  "collection/0x61a03eed4c0220bb6ee89b0cda10dc171f772577/all";

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
