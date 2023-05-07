import httpService from "./http.service";

const feedbackEndpoint = "feedback/";

const feedbackService = {
  post: async (from, subject, message) => {
    const { status } = await httpService.post(feedbackEndpoint, {
      from,
      subject,
      message,
    });
    return status;
  },
};
export default feedbackService;
