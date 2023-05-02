import axios from "axios";
import localStorageService from "./localStorage.service";

const httpFavourites = axios.create({
  baseURL: "https://navy.online/marketplace/auth/",
});

const favouritesService = {
  getFavouritesNft: async () => {
    const { data } = await httpFavourites.get(`favourites`, {
      headers: {
        Authorization: `Bearer ${localStorageService.getAccessToken()}`,
      },
    });
    return data;
  },
  addFavouritesNft: async ({ contractAddress, tokenId }) => {
    const { data, status } = await httpFavourites.post(
      `favourites/add`,
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
    const { status } = await httpFavourites.delete(`favourites/remove`, {
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
