const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const rockSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["analyst", "planner", "admin", "technician"], required: true },
});


rockSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  this.password = await bcrypt.hash(this.password, 10); 
  next();
});

rockSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Rock", rockSchema);
