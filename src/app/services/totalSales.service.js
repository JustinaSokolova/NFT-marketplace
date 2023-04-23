import httpService from "./http.service";

const totalSalesEndpoint = "dashboard/";

const totalSalesService = {
  get: async (value) => {
    const { data } = await httpService.get(totalSalesEndpoint + value);
    return data;
  },
};
export default totalSalesService;
