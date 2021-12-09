import { 
    GET_POSTS_SUCCESS, 
    GET_POSTS_FAIL, 
  } from "./types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { user }
    : { user: null };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_POSTS_SUCCESS:
        return {
          ...state,
          user: null,
        };
      case GET_POSTS_FAIL:
        return {
          ...state,
          user: payload.user,
        };
      default:
        return state;
    }
  }
  