const mongoose = require("mongoose");
require("dotenv").config();

const DBconnection = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;
  try {
    await mongoose.connect(MONGODB_URL, {});
    console.log("DB Connection Established successfully");
  } catch (err) {
    console.log("Error while connecting to DB", err.message);
  }
};
module.exports = { DBconnection };
