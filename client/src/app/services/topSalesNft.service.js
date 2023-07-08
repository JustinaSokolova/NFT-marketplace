import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const topSalesNftEndpoint = "topSales/";

const topSalesNftService = {
  get: async ({ blockchainType, selectedTime }) => {
    const { data } = await httpService.get(
      topSalesNftEndpoint + blockchainType + "/" + selectedTime
    );
    return data;
  },
  getIfLogged: async ({ blockchainType, selectedTime }) => {
    const { data } = await httpService.get(
      topSalesNftEndpoint + blockchainType + "/" + selectedTime,
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return data;
  },
};
export default topSalesNftService;
