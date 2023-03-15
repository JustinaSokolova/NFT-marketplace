import httpService from "./http.service";

const mintEndpoint = "mint/0x61a03eed4c0220bb6ee89b0cda10dc171f772577/";

const mintService = {
  get: async () => {
    const { data } = await httpService.get(mintEndpoint);
    return data;
  },
};
export default mintService;
