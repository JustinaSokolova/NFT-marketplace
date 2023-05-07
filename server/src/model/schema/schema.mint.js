const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Mint = new Schema({
    mintingEnabled: Boolean,
    mintingStartTime: String,
    mintingEndTime: String,

    /*
        chainId - string
        chainName - string
        coinSymbol - string
        mintPriceEth - number
        saleContractAddress - string
        tokenContractAddress - string
    */
    mintingDetails: [Schema.Types.Mixed],

    collectionSize: Number,
    collectionItemsLeft: Number,
    collectionPreview: [String],

    descriptionTitle: String,
    descriptionDescription: String,

    profitability: Boolean,
    profitabilityTitle: String,
    profitabilityValue: String,
    profitabilityDescription: String,

    rarity: Boolean,
    rarityTitle: String,
    rarityDescription: String,

    /*
        titleText - string
        titleColor - string
        description - string
    */
    rarityItems: [Schema.Types.Mixed],

    nftParts: Boolean,
    nftPartsTitle: String,
    nftPartsDescription: String,

    /*
        categoryTitle - string
        categoryPlural - string
        categorySingle - string
        categoryDetails - [{
            imageUrl -  string
            chancePercent - number
            rarity - string
        }];
    */
    nftPartsItems: [Schema.Types.Mixed]
});

const model = mongoose.model("Mint", Mint);

module.exports = { model };