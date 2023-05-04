const { Router } = require("express");
const router = Router();

const { postSavedImages } = require("../controllers/savedimagespage");

// Paths to querie
router.post("/postsavedimages/", postSavedImages);

module.exports = router;