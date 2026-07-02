import api, { setToken } from "./api";

// Descodifica o payload de um JWT sem o validar (a validação é feita no backend).
function decodeToken(token) {
  const payload = token.split(".")[1];
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json);
}

class AuthService {
  async login(email, password) {
    const res = await api.post("/login", { email, password });
    const { AccessToken } = res.data;
    setToken(AccessToken);
    return decodeToken(AccessToken);
  }

  async register(username, email, password, numero_telefone) {
    const res = await api.post("/register", {
      username,
      email,
      password,
      numero_telefone,
    });
    return res.data.data;
  }

  async getUserById(id) {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  }

  async logout() {
    try {
      await api.post("/logout");
    } finally {
      setToken(null);
    }
  }
}

export default new AuthService();
