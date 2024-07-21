const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "problem",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    enum: ["Time Limit Exceeded", "Wrong Answer", "Accepted", "Runtime Error", "Compilation Error"],
    default: "Pending",
  },
  submitted_at:{
    type: Date,
    default: Date.now,
  },
  time:{
    type:Number,
    default:2000
  }
});
module.exports = mongoose.model("submission", submissionSchema);
