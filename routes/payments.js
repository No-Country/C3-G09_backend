const { Router } = require("express");
const { preferences, view } = require("../controllers/paymentsController");
const router = Router();

router.get("/", view);
router.post("/", preferences);

module.exports = router;
