import httpService from "./http.service";

const mintEndpoint = "mint/cronos/0x2f79860e2a2829af3c135880da1e8fc3fd9ae398";

const mintService = {
  get: async () => {
    const { data } = await httpService.get(mintEndpoint);
    return data;
  },
};
export default mintService;
