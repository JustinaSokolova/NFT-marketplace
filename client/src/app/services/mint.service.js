import httpService from "./http.service";

const mintEndpoint = "mint/0xcefd45799326f48a4d23222bb8fa15b49baf28ec/";

const mintService = {
  get: async () => {
    const { data } = await httpService.get(mintEndpoint);
    return data;
  },
};
export default mintService;
