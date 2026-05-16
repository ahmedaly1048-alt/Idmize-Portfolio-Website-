const { Router } = require("express");
const { body } = require("express-validator");
const { createDemoRequest } = require("../controllers/demoController");

const router = Router();

const demoValidation = [
  body("name").trim().notEmpty().withMessage("Name is required.").isLength({ min: 2, max: 100 }),
  body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email."),
  body("company").trim().notEmpty().withMessage("Company is required.").isLength({ min: 2, max: 100 }),
  body("role").optional().isIn(["C-Level", "Director", "Manager", "Engineer", "Other", ""]),
  body("message").optional().isLength({ max: 1000 }),
];

router.post("/", demoValidation, createDemoRequest);

module.exports = router;