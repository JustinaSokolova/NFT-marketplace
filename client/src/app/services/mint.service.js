import httpService from "./http.service";

const mintEndpoint = "mint/0xA7D87Ec62772c3cB9b59de6f4ACa4c8602910bcd/";

const mintService = {
  get: async () => {
    const { data } = await httpService.get(mintEndpoint);
    return data;
  },
};
export default mintService;
