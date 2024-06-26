const mongoose = require("mongoose");
const problemSchema = new mongoose.Schema({
  Title: {
    type: String,
    default: null,
  },
  Description: {
    type: String,
    default: null,
  },
  Examples :[{
    input:String,
    output:String,
  }],
  timeConstraint :{
    type: String
  },
  spaceConstraint :{
    type: String
  }
});
module.exports = mongoose.model("problem", problemSchema);