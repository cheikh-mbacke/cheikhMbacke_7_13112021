import axios from "axios";

const API_URL = "http://localhost:3000/api/post/";

class PostReactService {
  
  Reaction(reactInfos) {
    let uri = "";
    if(reactInfos.userReact === 'like'){
      uri = "like"
    }else{
      uri = "dislike"
    }

    return axios
      .post(API_URL + uri, {
        data: reactInfos
      })
      .then((response) => {
        return response;
      }).catch(err => err)
  }

}

export default new PostReactService();
