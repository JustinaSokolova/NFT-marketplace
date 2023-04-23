import httpService from "./http.service";

const topSalesNftEndpoint = "topSales/";

const topSalesNftService = {
  get: async (value) => {
    const { data } = await httpService.get(topSalesNftEndpoint + value);
    return data;
  },
};
export default topSalesNftService;
