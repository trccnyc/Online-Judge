const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});
module.exports = mongoose.model("admin", adminSchema);
