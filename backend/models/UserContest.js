const mongoose = require("mongoose");
const userContestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest",
        required: true,
      },
      problems: [
        {
          problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",  // Reference to the Problem model
            required: true,
          },
          score: { type: Number, default: 0 },  // Default score is 0
        },
      ],
      totalscore:{
        type: Number, default: 0 
      }
});

module.exports = mongoose.model("userContest", userContestSchema);