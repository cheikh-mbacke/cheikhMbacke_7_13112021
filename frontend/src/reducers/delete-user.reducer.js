import { 
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from "./types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { user }
    : { user: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          user: null,
        };
      case DELETE_USER_FAIL:
        return {
          ...state,
          user: payload.user,
        };
      default:
        return state;
    }
  }
  