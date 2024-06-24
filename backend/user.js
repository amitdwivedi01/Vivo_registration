const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: String },
  gender: { type: String },
  profession: { type: String },
  email: { type: String },
  mobile: { type: String,},
  handset: { type: String },
  city: { type: String },
  favoriteFeature: { type: String },
  attractFeature: { type: String },
  usedVivoBefore: { type: String },
  awareOfLaunch: { type: String },
  launchSource: { type: String },
  trustSource: { type: String },
  considerBuying: { type: String },
  paymentMode: { type: String },
  rating: { type: String },
  imageUrl: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
