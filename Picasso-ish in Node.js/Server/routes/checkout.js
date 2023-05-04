const { Router } = require("express");
const router = Router();
const { validateCard, insertCard, orderInImage } = require("../controllers/checkout");

// Paths to queries
router.post("/validatecard/", validateCard);
router.post("/insertcard/", insertCard);
router.put("/orderinimage", orderInImage);

module.exports = router;