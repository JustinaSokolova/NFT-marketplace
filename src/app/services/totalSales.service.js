import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const totalSalesEndpoint = "dashboard/";

const totalSalesService = {
  get: async (value) => {
    const { data } = await httpService.get(totalSalesEndpoint + value);
    return data;
  },
  getIfLogged: async (page, size) => {
    const { data } = await httpService.get(totalSalesEndpoint, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
};
export default totalSalesService;
