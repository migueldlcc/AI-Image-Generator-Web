const { Router } = require("express");
const router = Router();

const { putSave, putShare, postSaveShareStutus, postImageOwner, updateLikes } = require("../controllers/genneratedpage");

// Paths to queries
router.put("/putSave/", putSave);
router.put("/putShare/", putShare);
router.post("/postSaveShareStutus/", postSaveShareStutus);
router.post("/postImageOwner/", postImageOwner);
router.put("/updatelikes/", updateLikes);

module.exports = router;