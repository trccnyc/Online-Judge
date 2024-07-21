const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
      contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest",
        required: true,
      },
      results:[
    
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "userContest",
         required: true,
       }
   ],
});

module.exports = mongoose.model("result", resultSchema);