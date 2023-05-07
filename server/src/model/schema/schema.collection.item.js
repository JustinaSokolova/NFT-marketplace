const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MarketplaceState = {
    LISTED: 0,
    SOLD: 1,
    NONE: 2
};

const CollectionItem = new Schema({
    id: { type: String, index: { unique: true } },
    tokenId: Number,
    tokenUri: String,
    seller: String,
    owner: String,
    price: Number,
    image: String,
    visuals: Schema.Types.Mixed,
    traits: Schema.Types.Mixed,
    rarity: String,
    lastUpdated: Number,
    needUpdate: { type: Boolean, default: false },
    contractAddress: String,
    chainId: String,
    chainName: String,
    coinSymbol: String,
    marketplaceState: Number
});

const model = mongoose.model("CollectionItem", CollectionItem);

module.exports = { MarketplaceState, model };