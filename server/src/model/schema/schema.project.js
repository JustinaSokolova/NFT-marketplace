const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectState = {
    DISABLED: 1,
    ANNOUNCEMENT: 2,
    MINTING: 3,
    MINTING_AND_SALE: 4,
    SALE: 5
};

const Project = new Schema({
    active: Boolean,
    name: String,
    state: Number,
    supportedChains: [String],
    collections: [Schema.Types.ObjectId]
});

const model = mongoose.model("Project", Project);

module.exports = { model, ProjectState };