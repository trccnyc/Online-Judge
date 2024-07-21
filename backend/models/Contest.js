const mongoose = require("mongoose");
const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  problems: [
    {
      problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem",
        required: true,
      },
      maxscore: { type: Number, required: true },
    },
  ],
  starttime: {
    type: Date,
    required: true,
  },
  endtime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("contest", contestSchema);
