const { Router } = require("express");
const router = Router();

const { postSignIn } = require("../controllers/signinpage");

// Path to queries
router.post("/postsigninpage/", postSignIn);

module.exports = router;