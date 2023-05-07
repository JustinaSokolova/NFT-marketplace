import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const captainsEndpoint =
  "collection/0xA7D87Ec62772c3cB9b59de6f4ACa4c8602910bcd/all";

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
