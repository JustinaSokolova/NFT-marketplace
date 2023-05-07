const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Faq = new Schema({
    questionsAndAnswers: [Schema.Types.Mixed]
});

const model = mongoose.model("Faq", Faq);

module.exports = { model };