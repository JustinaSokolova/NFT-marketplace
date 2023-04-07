import httpService from "./http.service";

const topSalesNftEndpoint = "topSales/642edafc8657652de31d1164/";

const topSalesNftService = {
  get: async (value) => {
    const { data } = await httpService.get(topSalesNftEndpoint + value);
    return data;
  },
};
export default topSalesNftService;
