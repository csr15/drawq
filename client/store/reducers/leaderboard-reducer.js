import {
  CRACKER_LEADERBOARD,
  REPLACER_LEADERBOARD,
} from "../actions/leaderboard-action";

const initialState = {
  crackerList: "",
  replacerList: "",
};

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CRACKER_LEADERBOARD:
      return {
        ...state,
        crackerList: action.payload,
      };
    case REPLACER_LEADERBOARD:
      return {
        ...state,
        replacerList: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        crackerList: "",
        replacerList: "",
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
