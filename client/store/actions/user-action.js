import axios from "axios";
import constants from "../../constants/constants";

export const USER_DETAILS = "USER_DETAILS";

export const fetchUserDetailshHandler = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${constants.proxy}/user/${uid}`);

      dispatch({ type: USER_DETAILS, payload: data });
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  };
};

export const updateHighScoreHandler = (gameData) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${constants.proxy}/user/update_high_score/cracker/${gameData.uid}`,
        {
          score: gameData.score,
          mode: gameData.mode,
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong!");
    }
  };
};

export const updateAvatarHandler = (imageData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${constants.proxy}/user/update_avatar/${imageData.uid}`,
        {
          imageURL: imageData.imageURL,
        }
      );
      dispatch({ type: USER_DETAILS, payload: data });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong!");
    }
  };
};

export const deleteAvatarHandler = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${constants.proxy}/user/delete_avatar/${uid}`
      );

      dispatch({ type: USER_DETAILS, payload: data });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong!");
    }
  };
};
