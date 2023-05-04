import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const favouritesService = {
  getFavouritesNft: async () => {
    const { data } = await httpService.get(`auth/favourites`, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
  addFavouritesNft: async ({ contractAddress, tokenId }) => {
    const { data, status } = await httpService.post(
      `auth/favourites/add`,
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
    const { status } = await httpService.delete(`auth/favourites/remove`, {
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
