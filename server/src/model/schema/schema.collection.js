const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Collection = new Schema({
    name: String,
    description: String,
    contractAddress: String,
    chainId: String,
    collectionSize: Number,
    collectionItemsLeft: Number,
    preview: [String],
    mint: Schema.Types.ObjectId
});

const model = mongoose.model("Collection", Collection);

module.exports = { model };