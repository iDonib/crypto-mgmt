const express = require("express");

const walletRoute = express.Router();

walletRoute.post("/add");
walletRoute.patch("/update/:id");
walletRoute.delete("/delete/:id");
walletRoute.get("/:id");

module.exports = walletRoute;
