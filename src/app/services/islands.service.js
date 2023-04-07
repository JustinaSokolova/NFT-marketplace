import httpService from "./http.service";

const islandsEndpoint =
  "collection/0x61a03eed4c0220bb6ee89b0cda10dc171f772577/all";

const islandsService = {
  get: async (page, size) => {
    const { data } = await httpService.get(islandsEndpoint, {
      params: { page, size },
    });
    return data;
  },
};
export default islandsService;
