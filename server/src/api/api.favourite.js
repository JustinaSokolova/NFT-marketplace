const mongo = require('../model/mongo.js');
const authApi = require('./api.auth.js');
const apiErrors = require('./api.errors.js');
const utilsApi = require('./api.utils.js');

async function getFavoutireNftByUserProfile(userProfile) {
    const favourites = await mongo.findFavouritesByUserProfile(userProfile);
    return favourites.map(f => {
        return f.collectionItem;
    });
}

async function getFavoutireNftIdsByAuthToken(authToken) {
    const userProfile = await authApi.checkTokenAndGetProfile(authToken);
    return await getFavoutireNftIdsByUserProfile(userProfile);
}

async function getFavouriteCollectionItemsByUserProfile(userProfile) {
    const favs = await getFavoutireNftByUserProfile(userProfile);
    const collectionItems = [];
    for (const fav of favs) {
        const collectionItem = await mongo.getCollectionItemFull({ _id: fav });
        collectionItems.push(collectionItem);
    }
    return collectionItems;
}

async function favouritesAdd(authToken, userRequest) {
    const favouriteResult = await _findFavourite(authToken, userRequest);
    if (favouriteResult.success) {
        await mongo.createFavourite(favouriteResult.userProfile, favouriteResult.collectionItem);
        const collectionItem = utilsApi.convertCollectionItemFromMongoModelToObject(favouriteResult.collectionItem, true);
        return {
            success: true,
            collectionItem
        }
    } else {
        return {
            success: false,
            reason: apiErrors.ERROR_BAD_PARAMS,
            httpErrorCode: apiErrors.HTTP_STATUS_CODE_BAD_REQUEST
        }
    }
}

async function favouritesRemove(authToken, userRequest) {
    const favouriteResult = await _findFavourite(authToken, userRequest);
    if (favouriteResult.success && favouriteResult.favourite) {
        await mongo.deleteFavouriteById(favouriteResult.favourite);
        return {
            success: true
        }
    } else {
        return {
            success: false,
            reason: apiErrors.ERROR_BAD_PARAMS,
            httpErrorCode: apiErrors.HTTP_STATUS_CODE_BAD_REQUEST
        }
    }
}

async function _findFavourite(authToken, userRequest) {
    const userProfileResult = await authApi.checkTokenAndGetProfile(authToken);
    const collectionItem = await mongo.getFavouriteCollectionItem(userRequest.contractAddress, userRequest.tokenId);
    if (collectionItem) {
        const favourite = await mongo.findFavouriteByCriteria({
            collectionItem,
            userProfile: userProfileResult.userProfile
        });
        return {
            success: true,
            userProfile: userProfileResult.userProfile,
            favourite,
            collectionItem
        }
    } else {
        return {
            success: false
        }
    }
}


module.exports = {
    favouritesAdd,
    favouritesRemove,
    getFavoutireNftByUserProfile,
    getFavouriteCollectionItemsByUserProfile
};