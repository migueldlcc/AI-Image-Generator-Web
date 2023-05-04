const { Router } = require("express");
const router = Router();

const { postProfile, updateProfile, postSaved, postShared, postAllCards } = require("../controllers/profile");

// Paths to queries
router.post("/postprofile/", postProfile);
router.put("/updateprofile/", updateProfile);
router.post("/postsaved/", postSaved);
router.post("/postshared/", postShared);
router.post("/postCards/", postAllCards);


module.exports = router;