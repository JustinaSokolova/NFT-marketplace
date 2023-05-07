import httpService from "./http.service";

const faqEndpoint = "faq/";

const faqService = {
  get: async () => {
    const { data } = await httpService.get(faqEndpoint);
    return data;
  },
};
export default faqService;
