import {
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SET_MESSAGE
} from "./types";
import DeleteUserService from "../services/user.service";
import AuthService from "../services/auth.service";

export const deleteUser = (userId) => (dispatch) => {
  return DeleteUserService.deleteUser(userId).then(
    (response) => {
      AuthService.logout();
      const message = response.data.message;
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.response &&
          error.response.response.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_USER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};