import httpService from "./http.service";

const captainsEndpoint =
  "collection/0x61a03eed4c0220bb6ee89b0cda10dc171f772577/all";

const captainsService = {
  get: async (page) => {
    const { data } = await httpService.get(captainsEndpoint, {
      params: { page },
    });
    return data;
  },
};
export default captainsService;
