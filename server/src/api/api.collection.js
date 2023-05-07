const mongo = require('../model/mongo.js');
const collectionItemSchema = require('../model/schema/schema.collection.item.js');
const authApi = require('./api.auth.js');
const favouriteApi = require('./api.favourite.js');
const generalApi = require('./api.general.js');
const utilsApi = require('./api.utils.js');

const CaptainContractAddress = () => '0x7e77efa1050aac8e12bee238c596d1561231e2ed'.toLowerCase();
const ShipContractAddress = () => '0x7e77efa1050aac8e12bee238c596d1561231e2ee'.toLowerCase();
const IslandContractAddress = () => '0x7e77efa1050aac8e12bee238c596d1561231e2ef'.toLowerCase();
const DefaultPaginationSize = 24;

async function getCollectionItemsByOwner(authToken) {
    const result = {
        captains: {
            total: 0,
            items: []
        },
        ships: {
            total: 0,
            items: []
        },
        islands: {
            total: 0,
            items: []
        },
    };

    const userProfileResult = await authApi.checkTokenAndGetProfile(authToken);

    if (userProfileResult.userProfile.ethAddress && userProfileResult.userProfile.ethAddress.length > 0) {
        const owner = userProfileResult.userProfile.ethAddress.toLowerCase();
        const collectionItems = [];

        collectionItems.push(...(await mongo.getCollectionItems({
            marketplaceState: collectionItemSchema.MarketplaceState.LISTED,
            seller: owner
        })));
        collectionItems.push(...(await mongo.getCollectionItems({
            marketplaceState: collectionItemSchema.MarketplaceState.NONE,
            owner
        })));

        const resultItems = _convertCollectionItems(collectionItems.sort(function (a, b) { return b.collectionAddress - a.collectionAddress }), false);
        await _fillCollectionItemsFavourites(resultItems, userProfileResult.userProfile);

        resultItems.forEach(f => {
            switch (f.contractAddress) {
                case CaptainContractAddress():
                    result.captains.total++;
                    result.captains.items.push(f);
                    break;
                case ShipContractAddress():
                    result.ships.total++;
                    result.ships.items.push(f);
                    break;
                case IslandContractAddress():
                    result.islands.total++;
                    result.islands.items.push(f);
                    break;
            }
        });
    }

    return result;
}

async function getCollectionItem(authToken, contractAddress, tokenId) {
    const collectionItem = await mongo.getCollectionItem({
        contractAddress,
        tokenId,
        marketplaceState: {
            "$ne": collectionItemSchema.MarketplaceState.SOLD
        }
    });

    let favourite = false;
    if (authToken) {
        const userProfileResult = await authApi.checkTokenAndGetProfile(authToken);
        if (userProfileResult.userProfile) {
            const userFavourites = await favouriteApi.getFavoutireNftByUserProfile(userProfileResult.userProfile);
            const collectionItems = await mongo.getCollectionItemsByIds(userFavourites);
            favourite = collectionItems.filter(f => f.contractAddress == collectionItem.contractAddress && f.tokenId == collectionItem.tokenId).length > 0;
        }
    }

    return utilsApi.convertCollectionItemFromMongoModelToObject(collectionItem, favourite);
}

async function getCollectionItems(
    authToken,
    contractAddress,
    page,
    size,
    rarity
) {
    let userProfile = undefined;
    if (authToken) {
        const userProfileResult = await authApi.checkTokenAndGetProfile(authToken);
        if (userProfileResult.success) {
            userProfile = userProfileResult.userProfile
        }
    }

    let initialPage = page;
    if (!page) {
        page = 1;
        initialPage = 1;
    }
    const pageSize = size ? size : DefaultPaginationSize;

    // ----------------------------------
    // Query collection items count
    // ----------------------------------

    const query = {
        contractAddress: contractAddress.toLowerCase(),
        marketplaceState: {
            "$ne": collectionItemSchema.MarketplaceState.SOLD
        }
    };

    const rarityCheck = rarity && (rarity == 'Legendary' || rarity == 'Epic' || rarity == 'Rare' || rarity == 'Common');
    if (rarityCheck) {
        query['rarity'] = rarity;
    }

    const count = await mongo.coutCollectionItems(query);

    // ----------------------------------
    // Query collection items
    // ----------------------------------

    const result = await mongo.getCollectionItemsPaginated(query, page, pageSize);

    // ----------------------------------
    // Prepare paginated response
    // ----------------------------------

    const resultItems = _convertCollectionItems(result, true);

    let pages = Math.ceil(count / pageSize);
    let next = null;
    let prev = null;

    if (pages < 1) {
        pages = 1;
    }
    if (pages > 1) {
        const getUrl = (p) => {
            let url = '';
            url = `https://navy.online/marketplace/collection/${contractAddress}/$all?page=${p}`;
            if (size) {
                url += '&size=' + size;
            }
            if (rarity) {
                url += '&rarity=' + size;
            }
            return url;
        };

        next = ((page - 1) * pageSize) + result.length < (count) ? getUrl(Number(initialPage) + 1) : null;
        prev = page > 1 ? getUrl(page - 1) : null;
    }

    const response = {
        info: {
            count,
            pages,
            next,
            prev
        },
        result: resultItems
    };

    // ----------------------------------
    // Fill favourites
    // ----------------------------------

    if (userProfile) {
        await _fillCollectionItemsFavourites(response.result, userProfile);
    }

    return response;
}

async function getFavouriteCollectionItemsByOwner(authToken) {
    const userProfileResult = await authApi.checkTokenAndGetProfile(authToken);
    if (userProfileResult.userProfile) {
        const userFavouriteIds = await favouriteApi.getFavoutireNftByUserProfile(userProfileResult.userProfile);
        const collectionItems = await mongo.getCollectionItemsByIds(userFavouriteIds);
        return collectionItems.map(f => {
            return utilsApi.convertCollectionItemFromMongoModelToObject(f, true);
        });
    } else {
        return [];
    }
}

async function getMintByCollection(collectionAddress) {
    const collection = await mongo.getCollectionByContractAddress(collectionAddress);
    const mint = await mongo.getMintByCollection(collection);
    return mint;
}

async function topSales(authToken, days) {
    const response = [];
    const projects = await generalApi.getProjects();
    if (projects) {
        const query = {
            contractAddress: [],
            marketplaceState: collectionItemSchema.MarketplaceState.SOLD,
            lastUpdated: { $gte: utilsApi.getDaysSeconds(days) }
        };

        projects[0].collections.forEach(collection => {
            query.contractAddress.push(collection.contractAddress);
        });

        const topSaleResult = await mongo.getTopSalesCollectionItems(query);

        const favourites = [];
        if (authToken) {
            const userProfileResult = await authApi.checkTokenAndGetProfile(authToken);
            const userFavourites = await favouriteApi.getFavouriteCollectionItemsByUserProfile(userProfileResult.userProfile);
            userFavourites.forEach(f => {
                favourites.push(f.contractAddress + '_' + f.tokenId);
            });
        }

        topSaleResult.forEach(f => {
            response.push(utilsApi.convertCollectionItemFromMongoModelToObject(f, favourites.includes(f.contractAddress + '_' + f.tokenId)));
        });
    }
    return response;
}

async function _fillCollectionItemsFavourites(collectionItems, userProfile) {
    const userFavourites = await favouriteApi.getFavoutireNftByUserProfile(userProfile);
    const favouriteCollectionItemsIds = userFavourites.map(f => {
        return f.tokenId;
    });
    collectionItems.forEach(f => {
        if (favouriteCollectionItemsIds.includes(f.tokenId)) {
            f.favourite = true;
        } else {
            f.favourite = false;
        }
    });
}

function _convertCollectionItems(collectionItems, swapSeller = false) {
    const resultItems = [];
    collectionItems.forEach(r => {
        const resultItem = utilsApi.convertCollectionItemFromMongoModelToObject(r, false);
        if (r.seller && swapSeller) {
            resultItem.owner = r.seller;
        }
        resultItems.push(resultItem);
    });
    return resultItems;
}

module.exports = {
    getFavouriteCollectionItemsByOwner,
    getCollectionItems,
    getCollectionItemsByOwner,
    getCollectionItem,
    getMintByCollection,
    topSales,
    CaptainContractAddress,
    ShipContractAddress,
    IslandContractAddress
};