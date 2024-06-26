const express = require("express");
const app = express();
const router = require("./routes/route");
require("dotenv").config();
const port = process.env.PORT;
const cors=require('cors');
app.use(cors('http://localhost:5173'));
//---------------------
app.use("/", router);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
