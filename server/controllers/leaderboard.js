const UserModel = require("../models/User");

module.exports = {
  cracker: async (req, res) => {
    const limit = req.params.limit;
    try {
      const data = await UserModel.find({})
        .sort({
          "highScore.cracker.score": -1,
        })
        .skip(limit - 5)
        .limit(parseInt(limit));

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
      console.log(error)
    }
  },
  replacer: async (req, res) => {
    const limit = req.params.limit;
    try {
      const data = await UserModel.find({})
        .sort({
          "highScore.replacer.level": -1,
        })
        .skip(limit - 5)
        .limit(parseInt(limit));

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
      console.log(error)
    }
  },
};
