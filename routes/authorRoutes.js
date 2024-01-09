const express = require("express");

const authorController = require("../controllers/authorController");
const authController = require("../controllers/authController");
const { body } = require("express-validator");

// implement auth controller

const router = express.Router();

router.post("/login",authController.login);


router.get("/me", authController.protect,authorController.getAuthor);

router
  .route("/")
  .get(authorController.getAllAuthors)
  .post(
    [
      body("name").exists().withMessage("Name is required"),
      body("email").exists().withMessage("Email is required"),
      body("phone_no").exists().withMessage("Phone number is required"),
    ],
    authorController.createAuthor
  );

router
  .route("/:id")
  .get(authorController.getAuthor)
  .patch(authorController.updateAuthor)
  .delete(authorController.deleteAuthor);

module.exports = router;
