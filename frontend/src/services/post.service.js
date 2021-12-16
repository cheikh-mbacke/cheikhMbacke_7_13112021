import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3000/api/post/";

class PostService {
  
  textPost(postData) {
    return axios
      .post(API_URL + "text", {
        data: {content: postData.content, userId: postData.userId},
      },{
        headers: {
          ...authHeader()
        }
      }
    )
      .then((response) => {
        return response;
      });
  }
  linkPost(postData) {
    return axios
      .post(API_URL + "link", {
        data: { title: postData.title, url: postData.url, userId: postData.userId }
      },
      {
        headers: {
          ...authHeader()
        }
      }
    )
      .then((response) => {
        return response;
      });
  }
  videoPost(postData) {
    return axios
      .post(API_URL + "video", postData, {headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader()
      }})
      .then((response) => {
        return response;
      });
  }
  imgPost(postData) {
    return axios
      .post(API_URL + "img", postData, {headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader()
      },
      
    })
      .then((response) => {
        return response;
      });
  }
  
  deletePost(postData) {
    return axios
      .post(API_URL + "delete", postData)
      .then((response) => {
        return response;
      }).catch(err => {
        return err
      })
  }

  getPosts(userInfo) {
    return axios.get(API_URL, {params: userInfo}, {headers: authHeader()}).then(result => result)
    .catch(err => err)
  }

  updatePost(postData) {

    return axios.post(API_URL + "update", postData, {headers: {
        Accept: 'multipart/form-data, application/json;charset=utf-8',
        ...authHeader()
      },
      
    })
      .then((response) => {
        return response;
      }).catch(err => {
        return err;
      })
  }
  
}

export default new PostService();
