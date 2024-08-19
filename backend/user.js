const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String},
  age: { type: String},
  gender: { type: String},
  profession: { type: String},
  email: { type: String },
  mobile: { type: String},
  handset: { type: String},
  experienceRating: { type: String},
  zeissFactor: { type: String},
  vivoDemoHelped: { type: String},
  photoUploadFrequency: { type: String},
  favoritePhotoType: { type: String},
  socialMediaTime: { type: String},
  purchasePreference: { type: String},
  influencerImpact: { type: String},
  favoriteV40Feature: { type: String},
  setupAttraction: { type: String },
  imageUrl: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
