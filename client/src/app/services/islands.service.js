import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const islandsEndpoint =
  "collection/0xcefd45799326f48a4d23222bb8fa15b49baf28ee/items";

const islandsService = {
  get: async (page, size, marketplaceState, rarity, priceOrder) => {
    const requestParams = {
      params: {
        page,
        size,
        marketplaceState,
        rarity:
          rarity.length > 0
            ? "[" + rarity.reduce((f, s) => `"${f}","${s}"`) + "]"
            : [],
        priceOrder,
      },
    };
    if (localStorageService.getAccessToken()) {
      requestParams["headers"] = {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      };
    }
    const { data } = await httpService.get(islandsEndpoint, requestParams);
    return data;
  },
};
export default islandsService;
