const mongoose = require("mongoose");

const rockSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["analyst", "mineplanner", "admin", "technician"] },
});

module.exports = mongoose.model("Rock", rockSchema);
