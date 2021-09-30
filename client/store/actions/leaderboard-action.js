import axios from "axios";
import constants from "../../constants/constants";

export const CRACKER_LEADERBOARD = "CRACKER_LEADERBOARD";
export const REPLACER_LEADERBOARD = "REPLACER_LEADERBOARD";

export const fetchCrackerLeaderboard = (limit) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${constants.proxy}/leaderboard/cracker/${limit}`
      );

      const easy = data.filter((el) => el.highScore.cracker.mode === "easy");
      const hard = data.filter((el) => el.highScore.cracker.mode === "hard");

      dispatch({
        type: CRACKER_LEADERBOARD,
        payload: {
          easy: easy,
          hard: hard,
        },
      });
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  };
};

export const fetchReplacerLeaderboard = (limit) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${constants.proxy}/leaderboard/replacer/${limit}`
      );

      const easy = data.filter((el) => el.highScore.replacer.mode === "easy");
      const hard = data.filter((el) => el.highScore.replacer.mode === "hard");

      dispatch({
        type: REPLACER_LEADERBOARD,
        payload: {
          easy: easy,
          hard: hard,
        },
      });
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  };
};
