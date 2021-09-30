const router = require("express").Router();

const { cracker, replacer } = require("../controllers/leaderboard");

//Leaderboard for cracker game
router.get("/cracker/:limit", cracker);

//Leaderboard for cracker game
router.get("/replacer/:limit", replacer);

module.exports = router;
