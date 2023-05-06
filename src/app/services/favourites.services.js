import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const favouritesEndpoint = "auth/favourites";

const favouritesService = {
  getFavouritesNft: async () => {
    const { data } = await httpService.get(favouritesEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
  addFavouritesNft: async ({ contractAddress, tokenId }) => {
    const { data, status } = await httpService.post(
      favouritesEndpoint,
      {
        contractAddress,
        tokenId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorageService.getAccessToken()}`,
        },
      }
    );
    return { data, status };
  },
  removeFavouritesNft: async ({ contractAddress, tokenId }) => {
    const { status } = await httpService.delete(favouritesEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
      data: {
        contractAddress,
        tokenId,
      },
    });
    console.log(status);
    return status;
  },
};

export default favouritesService;
