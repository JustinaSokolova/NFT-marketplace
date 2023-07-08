import httpService from "./http.service";

const coinRateEndpoint = "tokensUsdPrice/";

const coinUsdRateService = {
  get: async () => {
    const { data } = await httpService.get(coinRateEndpoint);
    return data;
  },
};
export default coinUsdRateService;
