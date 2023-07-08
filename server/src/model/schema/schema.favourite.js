const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Favourite = new Schema({
  userProfile: Schema.Types.ObjectId, // ссылка на схему юзера
  collectionItem: Schema.Types.ObjectId,
});

const model = mongoose.model("Favourite", Favourite);

module.exports = { model };
