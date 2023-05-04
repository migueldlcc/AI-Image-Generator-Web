const { Router } = require("express");
const router = Router();

const { postSharedImages } = require("../controllers/sharedimagespage");

// Paths to querie
router.post("/postsharedimages/", postSharedImages);

module.exports = router;