import httpService from "./http.service";

const shipsEndpoint =
  "collection/0xe0329c20d37d05806f73912b28f5434bcc56a8b7/all";

const shipsService = {
  get: async (page, size) => {
    const { data } = await httpService.get(shipsEndpoint, {
      params: { page, size },
    });
    return data;
  },
};
export default shipsService;
