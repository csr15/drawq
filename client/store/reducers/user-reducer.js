import { USER_DETAILS } from "../actions/user-action";

const initialState = {
  userDetails: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        userDetails: "",
      };
    default:
      return state;
  }
};

export default userReducer;