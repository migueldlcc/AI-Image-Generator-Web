const { Router } = require("express");
const router = Router();

const { postAllOrders, insertOrders } = require("../controllers/orderspage");

// Paths to queries
router.post("/postorderspage/", postAllOrders);
router.post("/insertorders", insertOrders);

module.exports = router;