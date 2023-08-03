const express = require("express");
const { getBalanceChangesByDay } = require("../controller/reportController");

const reportRoute = express.Router();

reportRoute.get("/get-report-by-day/:userId", getBalanceChangesByDay);

module.exports = reportRoute;
