const mongoose = require("mongoose");
const faqSchema = require("./schema/schema.faq.js");
const projectSchema = require("./schema/schema.project.js");
const collectionSchema = require("./schema/schema.collection.js");
const collectionItemSchema = require("./schema/schema.collection.item.js");
const userProfileSchema = require("./schema/schema.user.profile.js");
const favouriteSchema = require("./schema/schema.favourite.js");
const feedbackSchema = require("./schema/schema.feedback.js");
const mintSchema = require("./schema/schema.mint.js");

mongoose.set("strictQuery", false);

const mongoUrl =
  "mongodb://navyuser:jhassct872hbJGFJgkcva2s@23.111.202.19:27017/?authMechanism=DEFAULT";

async function init() {
  await mongoose
    .connect(mongoUrl, {
      dbName: "navy",
    })
    .catch((err) => console.error("Unable to connect to mongo", err));
  console.log("Connected to mongo!");
}

// -------------------------------------
// General collections
// -------------------------------------

async function getFaq() {
  const faq = await faqSchema.model.findOne();
  if (faq) {
    return faq.questionsAndAnswers;
  } else {
    return [];
  }
}

async function getActiveProjects() {
  const projects = await projectSchema.model.find({
    projectState: {
      $ne: projectSchema.ProjectState.DISABLED, // ne - "не равно" - дай мне модели у которых статус "не DISABLED"
    },
  });
  return projects;
}

async function getMintByCollection(collection) {
  return await mintSchema.model
    .findOne({ _id: collection.mint })
    .select(["-_id", "-__v"]);
}

async function saveFeedback(subject, message, from) {
  const feedback = new feedbackSchema.model();
  feedback.subject = subject;
  feedback.message = message;
  feedback.from = from;
  await feedback.save();
}

// -------------------------------------
// Nft's collection
// -------------------------------------

async function getCollectionById(id) {
  return await collectionSchema.model.findById(id);
}

async function getCollectionByContractAddress(contractAddress) {
  return await collectionSchema.model.findOne({ contractAddress });
}

async function countCollectionItems(criteria) {
  return await collectionItemSchema.model.countDocuments(criteria);
}

async function getCollectionItem(criteria) {
  return await collectionItemSchema.model
    .findOne(criteria)
    .select(["-_id", "-__v", "-needUpdate"]);
}

async function getCollectionItemFull(criteria) {
  return await collectionItemSchema.model.findOne(criteria);
}

async function getCollectionItemById(criteria) {
  return await collectionItemSchema.model
    .findById(criteria)
    .select(["-_id", "-__v", "-needUpdate"]);
}

async function getCollectionItemsByIds(ids) {
  return await collectionItemSchema.model
    .find({ _id: { $in: ids } })
    .select(["-_id", "-__v", "-id", "-needUpdate", "-visuals", "-traits"])
    .sort([
      ["marketplaceState", 1],
      ["tokenId", -1],
    ]);
}

async function coutCollectionItems(criteria) {
  return await collectionItemSchema.model.count(criteria);
}

async function getCollectionItems(criteria) {
  return await collectionItemSchema.model
    .find(criteria)
    .select(["-_id", "-__v", "-id", "-needUpdate", "-visuals", "-traits"]);
}

async function getCollectionItemsPaginated(criteria, page, pageSize) {
  // запрос к монго бд
  return await collectionItemSchema.model
    .find(criteria)
    .select(["-_id", "-__v", "-id", "-needUpdate", "-visuals", "-traits"])
    .skip((page - 1) * pageSize) // сколько пропустить элементов с начала
    .limit(pageSize) // сколько вытащить максимум после пропущенных
    .sort([
      ["marketplaceState", 1],
      ["tokenId", -1],
    ]);
}

async function getTopSalesCollectionItems(criteria) {
  return await collectionItemSchema.model
    .find(criteria)
    .select(["-_id", "-__v", "-id", "-needUpdate", "-visuals", "-traits"])
    .limit(9)
    .sort([
      ["price", -1],
      ["lastUpdated", 1],
    ]);
}

async function getFavouriteCollectionItem(contractAddress, tokenId) {
  return await collectionItemSchema.model.findOne({
    contractAddress,
    tokenId,
    marketplaceState: {
      $ne: collectionItemSchema.MarketplaceState.SOLD,
    },
  });
}

// -------------------------------------
// User profile collection
// -------------------------------------

async function createUserProfile(params) {
  return await new userProfileSchema.model(params).save();
}

async function findUserProfileById(id) {
  return await userProfileSchema.model.findById(id);
}

async function findUserProfileByEmail(email) {
  return await userProfileSchema.model.findOne({ email });
}

async function findUserProfileByEthAddress(ethAddress) {
  return await userProfileSchema.model.findOne({ ethAddress });
}

async function findUserProfileByAuthToken(authToken) {
  return await userProfileSchema.model.findOne({ authToken });
}

async function emailExists(email) {
  const profiles = await userProfileSchema.model.count({ email });
  return profiles > 0;
}

async function walletExists(ethAddress) {
  const profiles = await userProfileSchema.model.count({ ethAddress });
  return profiles > 0;
}

// -------------------------------------
// Favourite collection
// -------------------------------------

async function createFavourite(userProfile, collectionItem) {
  const newFavourite = new favouriteSchema.model();
  newFavourite.userProfile = userProfile._id;
  newFavourite.collectionItem = collectionItem._id;
  await newFavourite.save();
}

async function deleteFavouriteById(favourite) {
  await favouriteSchema.model.deleteOne({ _id: favourite._id });
}

async function findFavouritesByUserProfile(userProfile) {
  return await favouriteSchema.model.find({ userProfile });
}

async function findFavouriteByCriteria(criteria) {
  return await favouriteSchema.model.findOne(criteria);
}

module.exports = {
  init,
  getFaq,
  saveFeedback,
  getActiveProjects,
  getMintByCollection,
  getCollectionById,
  getCollectionByContractAddress,
  getCollectionItem,
  getCollectionItemFull,
  getCollectionItemById,
  getCollectionItemsByIds,
  getCollectionItems,
  coutCollectionItems,
  getCollectionItemsPaginated,
  getTopSalesCollectionItems,
  getFavouriteCollectionItem,
  countCollectionItems,
  createUserProfile,
  findUserProfileById,
  findUserProfileByEmail,
  findUserProfileByEthAddress,
  findUserProfileByAuthToken,
  emailExists,
  walletExists,
  createFavourite,
  deleteFavouriteById,
  findFavouritesByUserProfile,
  findFavouriteByCriteria,
};
