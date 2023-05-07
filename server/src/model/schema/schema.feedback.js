const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Feedback = new Schema({
    subject: String,
    message: String,
    from: String,
    date: { type: Date, default: Date.now }
});

const model = mongoose.model("Feedback", Feedback);

module.exports = { model };