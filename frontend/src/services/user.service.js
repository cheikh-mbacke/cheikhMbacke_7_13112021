import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/users/";

class UserService {
  getOneUser(userId) {
    return axios
      .get(API_URL + userId)
      .then((response) => {
        return response.data;
      });
  }
  getUserBoard() {
    return axios.get(API_URL + "std", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
