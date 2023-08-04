const express = require("express");
const {
  getBalanceChangesByDay,
  getBalanceChangesByWeek,
  getBalanceChangesByMonth,
} = require("../controller/reportController");

const reportRoute = express.Router();

reportRoute.get("/get-report-by-day/:userId", getBalanceChangesByDay);
reportRoute.get("/get-report-by-week/:userId", getBalanceChangesByWeek);
reportRoute.get("/get-report-by-month/:userId", getBalanceChangesByMonth);

module.exports = reportRoute;
