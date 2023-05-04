const { Router } = require("express");
const router = Router();

const { postSignUp } = require("../controllers/signuppage");

// Path to queries
router.post("/postsignuppage/", postSignUp); 

module.exports = router;