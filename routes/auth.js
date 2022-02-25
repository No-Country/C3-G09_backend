const { Router } = require("express");
const router = Router();
const {
  signUp,
  signIn,
  verify,
  verified,
} = require("../controllers/authController");



router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/verify/:uid", verify);
router.get("/verified", verified);

module.exports = router;
