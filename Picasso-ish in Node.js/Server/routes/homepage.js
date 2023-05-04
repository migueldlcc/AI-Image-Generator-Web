const { Router } = require("express");
const router = Router();

const {
  getNineImages,
  getOneImages,
  getLastFourImages,
  getSmallImages,
  getLargeImages,
  postArtworks,
} = require("../controllers/homepage");

// Paths to queries
router.post("/postartworks/:keyword", postArtworks);
router.get("/getnineimages", getNineImages);
router.get("/getOneImages/", getOneImages);
router.get("/getlastfourimages", getLastFourImages);
router.post("/getsmallimages", getSmallImages);
router.post("/getlargeimages", getLargeImages);

module.exports = router;
