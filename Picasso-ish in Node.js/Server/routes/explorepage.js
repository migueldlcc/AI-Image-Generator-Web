const { Router } = require("express");
const router = Router();

const { postMostLikes, postLeastLikes, postNewImages } = require("../controllers/explorepage");

// Paths to queries
router.post("/postMostLikes/", postMostLikes);
router.post("/postLeastLikes", postLeastLikes);
router.post("/postNewImages", postNewImages);

module.exports = router;