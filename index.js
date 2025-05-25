"use strict";
require("dotenv").config();
const express = require("express");


const app = require("./server").expressApp;
const server = require("./server").httServer;
const cors = require("cors");



const bodyParser = require("body-parser");
const connection = require("./connections/mongo");
const responses = require("./common/response");
const v1Routes = require("./v1/routes");

const PORT =process.env.PORT


app.use(cors());
app.use(responses());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/v1", v1Routes);


app.use("/", express.static(__dirname + "/public"));

// 404, Not Found
// app.use((req, res, next) => res.error(404, "NOT_FOUND"));


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE" );
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,content-type");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// Error handling
app.use((error, req, res, next) => {
  return res.error(400, error.message || error);
});


// Apply graphql Apollo Server middleware



// Listening & Initializing
server.listen(process.env.PORT, async () => {
 
  connection.mongodb();
});






