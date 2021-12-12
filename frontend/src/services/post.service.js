import axios from "axios";

const API_URL = "http://localhost:3000/api/post/";

class PostService {
  textPost(postData) {
    return axios
      .post(API_URL + "text", {
        data: {
          content: postData.content,
          userId: postData.userId
        }
      })
      .then((response) => {
        return response;
      });
  }
  linkPost(postData) {
    return axios
      .post(API_URL + "link", {
        data: {
          title: postData.title,
          url: postData.url,
          userId: postData.userId
        }
      })
      .then((response) => {
        return response;
      });
  }
  videoPost(postData) {
    return axios
      .post(API_URL + "video", postData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        return response;
      });
  }
  imgPost(postData) {
    return axios
      .post(API_URL + "img", postData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        return response;
      });
  }
  getPosts(userInfo) {
    return axios.post(API_URL + "allPosts", userInfo).then(result => result)
    .catch(err => err)
  }
}

export default new PostService();
