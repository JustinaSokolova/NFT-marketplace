import httpService from "./http.service";

const totalSalesEndpoint = "dashboard/642edafc8657652de31d1164/";

const totalSalesService = {
  get: async (value) => {
    const { data } = await httpService.get(totalSalesEndpoint + value);
    return data;
  },
};
export default totalSalesService;
