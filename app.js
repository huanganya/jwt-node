require("dotenv").config();
require("./config/database");
const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const path = require('path');

const app = express();
global.publicPath = path.join(__dirname, 'public');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use("/public", express.static(path.join(__dirname, 'public')));

const routes = require('./routes/index.route');
app.use(routes);

module.exports = app;