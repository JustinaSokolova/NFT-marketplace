import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const collItemEndpoint = "collection/";

const collItemService = {
  get: async ({ address, tokenId }) => {
    const { data } = await httpService.get(
      collItemEndpoint + `${address}/item/${tokenId}`
    );
    return data;
  },
  getIfLogged: async ({ address, tokenId }) => {
    const { data } = await httpService.get(
      collItemEndpoint + `${address}/item/${tokenId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return data;
  },
};
export default collItemService;
