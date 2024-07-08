const mongoose = require("mongoose");
const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
  constraints: {
    type: String,
    default: null,
  },
  input_format: {
    type: String,
    required: true,
  },
  output_format: {
    type: String,
    required: true,
  },
  limits: {
    time: { type: String, required: true },
    space: { type: String, required: true },
  },
});
module.exports = mongoose.model("problem", problemSchema);
