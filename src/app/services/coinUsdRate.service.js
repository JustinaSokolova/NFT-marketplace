import httpService from "./http.service";

const coinRateEndpoint = "cronosUsdPrice/";

const coinUsdRateService = {
  get: async () => {
    const { data } = await httpService.get(coinRateEndpoint);
    return data;
  },
};
export default coinUsdRateService;
