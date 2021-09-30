const router = require("express").Router();

//Controllers for routers
const user = require("../controllers/user");

//Fetching user details
router.get("/:uid", user.userDetails);

//Updating highScore of cracker game
router.post("/update_high_score/cracker/:uid", user.updateCrackerHighScore);

//Updating highScore of replacer game
router.post("/update_high_score/replacer/:uid", user.updateReplacerHighScore);

//Updating user avatar
router.post("/update_avatar/:uid", user.updateAvatar);

//Deleting user avatar
router.delete("/delete_avatar/:uid", user.deleteAvatar);

module.exports = router;
