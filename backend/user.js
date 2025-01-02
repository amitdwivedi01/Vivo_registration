const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: String },
  gender: { type: String },
  profession: { type: String },
  contact: { type: String }, // Changed from mobile to contact
  email: { type: String },
  handset: { type: String },
  x200_awareness: { type: String },
  source: { type: String }, // Added source field
  state: { type: String },
  photography_interest: { type: String }, // Added photography_interest field
  photograph_type: { type: [String] }, // Changed to array for photograph_type
  go_out_for_photography: { type: String },
  visitReason: { type: String },
  other_profession: { type: String },
  other_handset: { type: String },
  other_source: { type: String },
  other_visitReason: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
