import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import favouritesService from "../services/favourites.services";

export const loadFavouritesList = createAsyncThunk(
  "favourites/loadFavouritesList",
  async () => {
    const content = await favouritesService.getFavouritesNft();
    return content;
  }
);

export const addFavourites = createAsyncThunk(
  "favourites/addFavourites",
  async (payload) => {
    const { data, status } = await favouritesService.addFavouritesNft(payload);
    if (status === 200) return data;
    throw new Error("Failed to add favourite");
  }
);

export const removeFavourites = createAsyncThunk(
  "favourites/removeFavourites",
  async (payload) => {
    const status = await favouritesService.removeFavouritesNft(payload);
    if (status === 200) return payload;
    throw new Error("Failed to remove favourite");
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavouritesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFavouritesList.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addCase(loadFavouritesList.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(addFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        state.entities.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addFavourites.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(removeFavourites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavourites.fulfilled, (state, action) => {
        state.entities = state.entities.filter((item) => {
          return (
            item.tokenId !== action.payload.tokenId ||
            item.contractAddress !== action.payload.contractAddress
          );
        });
        state.isLoading = false;
      })
      .addCase(removeFavourites.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

const { reducer: favouritesReducer, actions } = favouritesSlice;

export const getFavourites = () => (state) => state.favourites.entities;
export const getFavouritesLoadingStatus = () => (state) =>
  state.favourites.isLoading;

export default favouritesReducer;

// const favouritesSlice = createSlice({
//   name: "favourites",
//   initialState: {
//     entities: null,
//     isLoading: true,
//     error: null,
//   },
//   reducers: {
//     favouritesRequested: (state) => {
//       state.isLoading = true;
//     },
//     favouritesRequestSuccess: (state, action) => {
//       state.entities = action.payload;
//       state.isLoading = false;
//     },
//     favouritesRequestFailed: (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     },
//     favouritesAddSuccess: (state, action) => {
//       if (!Array.isArray(state.entities)) {
//         state.entities = [];
//       }
//       console.log(action.payload);
//       state.entities.push(action.payload);
//     },
//     addFavouritesFailed: (state, action) => {
//       state.error = action.payload;
//     },
//     favouritesRemoveSuccess: (state, action) => {
//       state.entities = state.entities.filter((item) => {
//         return (
//           item.tokenId !== action.payload.tokenId ||
//           item.contractAddress !== action.payload.contractAddress
//         );
//       });
//     },
//     removeFavouritesFailed: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// const { reducer: favouritesReducer, actions } = favouritesSlice;
// const {
//   favouritesRequested,
//   favouritesRequestSuccess,
//   favouritesRequestFailed,
//   favouritesAddSuccess,
//   addFavouritesFailed,
//   favouritesRemoveSuccess,
//   removeFavouritesFailed,
// } = actions;

// const favouritesAddRequested = createAction(
//   "favourites/favouritesAddRequested"
// );
// const favouritesRemoveRequested = createAction(
//   "favourites/favouritesRemoveRequested"
// );

// export const loadFavouritesList = () => async (dispatch) => {
//   // {contractAddress, tokenId} = payload;
//   dispatch(favouritesRequested());
//   try {
//     const content = await favouritesService.getFavouritesNft();
//     dispatch(favouritesRequestSuccess(content));
//   } catch (error) {
//     dispatch(favouritesRequestFailed(error.message));
//   }
// };

// export const addFavourites = (payload) => async (dispatch) => {
//   console.log(payload);
//   dispatch(favouritesAddRequested());
//   try {
//     const { data, status } = await favouritesService.addFavouritesNft(payload);
//     console.log(data);
//     if (status === 200) dispatch(favouritesAddSuccess(data));
//   } catch (error) {
//     dispatch(addFavouritesFailed(error.message));
//   }
// };

// export const removeFavourites = (payload) => async (dispatch, getState) => {
//   dispatch(favouritesRemoveRequested());
//   try {
//     const status = await favouritesService.removeFavouritesNft(payload);

//     if (status === 200) dispatch(favouritesRemoveSuccess(payload));
//   } catch (error) {
//     dispatch(removeFavouritesFailed(error.message));
//   }
// };

// export const getFavourites = () => (state) => state.favourites.entities;
// export const getFavouritesLoadingStatus = () => (state) =>
//   state.favourites.isLoading;
