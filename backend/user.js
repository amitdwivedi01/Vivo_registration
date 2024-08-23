const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  profession: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  handset: { type: String, required: true },
  experienceRating: { type: String, required: true },
  zeissFactor: { type: String, required: true },
  vivoDemoHelped: { type: String, required: true },
  photoUploadFrequency: { type: String },
  favoritePhotoType: { type: String, required: true },
  socialMediaTime: { type: String },
  purchasePreference: { type: String },
  influencerImpact: { type: String, required: true },
  favoriteV40Feature: { type: String, required: true },
  setupAttraction: { type: String, required: true },
  city: { type: String, required: true }, // Added city field
  imageUrl: { type: String }, // Image URL if uploaded
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
