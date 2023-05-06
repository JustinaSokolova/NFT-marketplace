import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const islandsEndpoint =
  "collection/0x7e77efa1050aac8e12bee238c596d1561231e2ef/all";

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
