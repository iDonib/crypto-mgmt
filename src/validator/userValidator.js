const { body } = require("express-validator");
const validateReq = require("../helpers/validationHelper");

const validateRegisterUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required1")
    .isLength({ min: 2 })
    .withMessage("Name should be more than 2 characters"),

  body("email").isEmail().withMessage("Please enter valid email"),

  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be greater than 4 characters"),

  body("contact")
    .isLength({ min: 8 })
    .withMessage("Contact number must be at least 8 characters")
    .optional(),

  body("age", "Age should be a number").isNumeric().optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

const validateUpdateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required1")
    .isLength({ min: 2 })
    .withMessage("Name should be more than 2 characters")
    .optional(),

  body("email").isEmail().withMessage("Please enter valid email").optional(),

  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be greater than 4 characters")
    .optional(),

  body("contact")
    .isLength({ min: 8 })
    .withMessage("Contact number must be at least 8 characters")
    .optional(),

  body("age", "Age should be a number").isNumeric().optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

const validateLoginUser = [
  body("email").isEmail().withMessage("Invalid Email"),

  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

module.exports = {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};
