import { 
    POST_SUCCESS, 
    POST_FAIL, 
    SET_MESSAGE 
  } from "./types";
  import PostService from "../services/post.service";
  
  export const textPost = (postData) => (dispatch) => {
    return PostService.textPost(postData).then(
      (response) => {
        /*Apeler ici la fonction récupérer les posts
        ....
        */

        const message = response.data.message;
        dispatch({
          type: POST_SUCCESS,
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
          type: POST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const linkPost = (postData) => (dispatch) => {
    return PostService.linkPost(postData).then(
      (response) => {
        /*Apeler ici la fonction récupérer les posts
        ....
        */

        const message = response.data.message;
        dispatch({
          type: POST_SUCCESS,
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
          type: POST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const videoPost = (postData) => (dispatch) => {
    return PostService.videoPost(postData).then(
      (response) => {
        /*Apeler ici la fonction récupérer les posts
        ....
        */

        const message = response.data.message;
        dispatch({
          type: POST_SUCCESS,
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
          type: POST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const imgPost = (postData) => (dispatch) => {
    return PostService.imgPost(postData).then(
      (response) => {
        /*Apeler ici la fonction récupérer les posts
        ....
        */

        const message = response.data.message;
        dispatch({
          type: POST_SUCCESS,
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
          type: POST_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };