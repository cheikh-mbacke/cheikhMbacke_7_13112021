import axios from "axios";

const API_URL = "http://localhost:3000/api/users/delete";

class DeleteUserService {
  deleteUser(userId) {
    return axios
      .delete(API_URL, {data: {
        userId: userId
      } })
      .then((response) => {
        return response;
      });
  }
}

export default new DeleteUserService();
