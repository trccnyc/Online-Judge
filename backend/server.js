const express = require("express");
const app = express();
const userRoutes = require("./routes/user.js");
const problemRoutes = require("./routes/problem.js");
const compilerRoutes = require("./routes/compiler.js");
const submissionRoutes=require('./routes/submissions.js');
const contestRoutes=require('./routes/contest.js');
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { DBconnection } = require("./database/db.js");
require("dotenv").config();

DBconnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT, credentials: true }));
app.use(bodyParser.json());

app.use("/", userRoutes);
app.use("/problemset", problemRoutes);
app.use("/compiler", compilerRoutes);
app.use("/submissions", submissionRoutes);
app.use('/contest',contestRoutes)

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
