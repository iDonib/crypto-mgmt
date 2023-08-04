const { body } = require("express-validator");
const validateReq = require("../helpers/validationHelper");

const validateAddWallet = [
  body("userId", "userId must be mongoose ID!").isMongoId(),

  body("address", "Wallet address must be provided!").notEmpty(),

  body("balance", "Balance must be numeric").isNumeric().optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

const validateUpdateWallet = [
  body("address", "Wallet address must be provided!").notEmpty().optional(),

  body("balance", "Balance must be numeric").isNumeric().optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

module.exports = { validateAddWallet, validateUpdateWallet };
