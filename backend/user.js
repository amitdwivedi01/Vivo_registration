const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  handset: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  attraction: {
    type: String,
    required: true
  },
  usedVivoBefore: {
    type: String,
    required: true
  },
  cameraModulePreference: {
    type: String,
    required: true
  },
  favoriteFeatureV30e: {
    type: String,
    required: true
  },
  portraitExperience: {
    type: String,
    required: true
  },
  standoutFeature: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
