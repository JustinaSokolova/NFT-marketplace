import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const shipsService = {
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

    const shipsEndpoint =
      localStorageService.getBlockchainType() === "cronos"
        ? "collection/cronos/0x2f79860e2a2829af3c135880da1e8fc3fd9ae399/items"
        : "collection/venom/0:dbcdf5d43044c8039fc34fcf8e695f10774ef942b10f93bd9c78513761c518df/items";

    const { data } = await httpService.get(shipsEndpoint, requestParams);
    return data;
  },
};
export default shipsService;
