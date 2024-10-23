// backend/app.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const ruleRoutes = require("./routes/ruleRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/", ruleRoutes);

module.exports = app;
