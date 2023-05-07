const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfile = new Schema({
    email: String,
    authToken: String,
    password: String,
    ethAddress: String
});

const model = mongoose.model("UserProfile", UserProfile);

module.exports = { model };