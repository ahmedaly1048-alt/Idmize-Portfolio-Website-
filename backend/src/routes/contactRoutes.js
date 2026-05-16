const { Router } = require("express");
const { body } = require("express-validator");
const { createContactMessage } = require("../controllers/contactController");

const router = Router();

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required.").isLength({ min: 2, max: 100 }),
  body("email").trim().notEmpty().withMessage("Email is required.").isEmail().withMessage("Invalid email."),
  body("subject").optional().isLength({ max: 200 }).withMessage("Subject too long."),
  body("message").trim().notEmpty().withMessage("Message is required.").isLength({ min: 10, max: 2000 }).withMessage("Message must be 10–2000 characters."),
];

router.post("/", contactValidation, createContactMessage);

module.exports = router;