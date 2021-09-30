//Models
const UserModel = require("../models/User");

module.exports = {
  userDetails: async (req, res) => {
    try {
      const data = await UserModel.findById(req.params.uid);

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  updateCrackerHighScore: async (req, res) => {
    try {
      await UserModel.findByIdAndUpdate(req.params.uid, {
        $set: {
          "highScore.cracker": {
            score: req.body.score,
            mode: req.body.mode,
          },
        },
      });

      res.status(200).json("updated");
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  updateReplacerHighScore: async (req, res) => {
    try {
      await UserModel.findByIdAndUpdate(req.params.uid, {
        $set: {
          "highScore.replacer": {
            level: req.body.level,
            mode: req.body.mode,
          },
        },
      });

      res.status(200).json("updated");
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  updateAvatar: async (req, res) => {
    try {
      const data = await UserModel.findByIdAndUpdate(
        req.params.uid,
        {
          $set: {
            avatar: req.body.imageURL,
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
  deleteAvatar: async (req, res) => {
    try {
      const data = await UserModel.findByIdAndUpdate(
        req.params.uid,
        {
          $set: {
            avatar: "",
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Something went wrong, Please try again");
    }
  },
};
