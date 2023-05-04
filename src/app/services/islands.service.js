import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const islandsEndpoint =
  "collection/0x61a03eed4c0220bb6ee89b0cda10dc171f772579/all";

const islandsService = {
  get: async (page, size) => {
    const { data } = await httpService.get(islandsEndpoint, {
      params: { page, size },
    });
    return data;
  },
  getIfLogged: async (page, size) => {
    const { data } = await httpService.get(islandsEndpoint, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};
export default islandsService;
