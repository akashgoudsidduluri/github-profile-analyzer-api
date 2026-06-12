const express = require("express");
const router = express.Router();

const {getGithubProfile,postGithubProfile,getAllProfiles,getSingleProfile} = require("../controllers/profileController");
router.get("/github/:username", getGithubProfile);
router.post("/analyze/:username",postGithubProfile);
router.get("/profiles",getAllProfiles);
router.get("/profiles/:username",getSingleProfile);
module.exports = router;