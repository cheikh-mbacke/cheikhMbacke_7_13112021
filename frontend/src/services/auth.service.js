import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(pseudo, email, password) {
    return axios.post(API_URL + "signup", {
      pseudo,
      email,
      password,
    });
  }
}

export default new AuthService();
