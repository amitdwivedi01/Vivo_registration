const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  gender: { type: String },
  age: { type: String },
  state: { type: String },
  email:{type:String},
  purchaseDecision: { type: String },
  profession: { type: String },
  handset: { type: String },
  usage_duration: { type: String },
  phonePurchase: { type: String },
  other_phonePurchase: { type: String },
  features: { type: String },
  cameraMode: { type: String },
  weddingFeature: { type: String },
  vzCollab: { type: String },
  weddingClick: { type: String },
  selfCapture: { type: String },
  weddingPhotographyEngagement: { type: String },
  favoriteEvent: { type: String },
  futureFeatures: { type: String },
  weddingPhotographyAwareness: { type: String },
  weddingScenario: { type: String },
  v50Photography: { type: String },
  v50NextPurchase: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
