const express = require("express");
const router = express.Router();
const {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogOut,
} = require("../controllers/user_controller");

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogOut);

module.exports = router;
