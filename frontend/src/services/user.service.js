import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/users/";

class UserService {
  getOneUser(userId) {
    return axios
      .get(API_URL + userId, {headers: authHeader()})
      .then((response) => {
        return response.data;
      });
  }
  deleteUser(userId) {
    return axios
      .delete(API_URL + "delete", {data: {userId: userId}})
      .then((response) => {
        localStorage.removeItem("user");
        return response;
      });

      
  }
}

export default new UserService();
