import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const topSalesNftEndpoint = "topSales/";

const topSalesNftService = {
  get: async (value) => {
    const { data } = await httpService.get(topSalesNftEndpoint + value);
    return data;
  },
  getIfLogged: async (value) => {
    const { data } = await httpService.get(topSalesNftEndpoint + value, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};
export default topSalesNftService;
