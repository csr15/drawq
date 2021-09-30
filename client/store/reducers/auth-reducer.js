import { SIGNUP } from "../actions/auth-action";

const initialState = {
  signupData: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signupData: action.payload,
      };
    case "RESET_SIGNUP_DATA":
      return {
        ...state,
        signupData: "",
      };
    case "LOGOUT":
      return {
        signupData: "",
      };
    default:
      return state;
  }
};

export default authReducer