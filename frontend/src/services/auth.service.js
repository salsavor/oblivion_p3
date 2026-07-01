import axios from "axios";

class AuthService {
  async login(email, password) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  }

  async logout() {
    // Se tiveres endpoint de logout, chama-o aqui
    // await axios.post("http://localhost:5000/api/v1/logout");
  }
}

export default new AuthService();
