function convertCollectionItemFromMongoModelToObject(collectionItem, favourite) {
    return {
        tokenId: collectionItem.tokenId,
        tokenUri: collectionItem.tokenUri,
        seller: collectionItem.seller,
        owner: collectionItem.owner,
        price: collectionItem.price,
        image: collectionItem.image,
        visuals: collectionItem.visuals,
        traits: collectionItem.traits,
        rarity: collectionItem.rarity,
        contractAddress: collectionItem.contractAddress,
        collectionName: collectionItem.collectionName,
        chainId: collectionItem.chainId,
        marketplaceState: collectionItem.marketplaceState,
        lastUpdated: collectionItem.lastUpdated,
        chainName: 'Cronos',
        coinSymbol: 'CRO',
        favourite
    }
}

function getDaysSeconds(days) {
    const nowTimeSeconds = Number(Number(Date.now() / 1000).toFixed(0));
    const daySeconds = 24 * 60 * 60;
    let seconds = nowTimeSeconds;
    if (days) {
        if (days == '7') {
            seconds = nowTimeSeconds - (daySeconds * 7);
        } else if (days == '30') {
            seconds = nowTimeSeconds - (daySeconds * 30);
        } else {
            seconds = nowTimeSeconds - daySeconds;
        }
    }
    return seconds;
}

module.exports = {
    convertCollectionItemFromMongoModelToObject,
    getDaysSeconds
};