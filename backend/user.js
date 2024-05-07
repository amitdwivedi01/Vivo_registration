const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
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
  city: {
    type: String,
    required: true
  },
  handset: {
    type: String,
    required: true
  },
  tenure: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
