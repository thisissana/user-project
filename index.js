const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/index");
const userRouter = require("./router/userRouter");

const app = express();

const PORT = 3000; //PORT Assignment

app.listen(PORT, () => {
  console.log(`Connected to port number ${PORT}`);
});

mongoose
  .connect(config.dbConStr)
  .then((res) => console.log("Connected to Mongo DB"))
  .catch((res) => console.log("Not Connected"));

app.use(bodyParser.json());

//Routing Endpoints

app.use("/users/api", userRouter);
