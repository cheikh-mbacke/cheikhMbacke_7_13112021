import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3000/api/comment/";

class CommentService {
  
  postComment(commentData) {
    return axios
      .post(API_URL + "create", {data: commentData}, {headers: {...authHeader()}})
      .then((response) => {
        return response;
      });
  }

  deleteComment(postData) {

    return axios
      .post(API_URL + "delete", postData, {headers: authHeader()})
      .then((response) => {
        return response;
      }).catch(err => {
        return err
      })
  }

}

export default new CommentService();
