import axios from "axios";

const API_URL = "http://localhost:3000/api/comment/";

class CommentService {
  
  postComment(commentData) {
    return axios
      .post(API_URL + "create", {
        data: commentData
      })
      .then((response) => {
        return response;
      });
  }

  deleteComment(postData) {
    console.log(postData);
    return axios
      .post(API_URL + "delete", postData)
      .then((response) => {
        return response;
      }).catch(err => {
        return err
      })
  }

}

export default new CommentService();
