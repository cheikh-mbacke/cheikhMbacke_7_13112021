import { 
    POST_COMMENT_SUCCESS, 
    POST_COMMENT_FAIL, 
  } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { user }
    : { user: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case POST_COMMENT_SUCCESS:
        return {
          ...state,
          user: null,
        };
      case POST_COMMENT_FAIL:
        return {
          ...state,
          user: payload.user,
        };
      default:
        return state;
    }
  }
  