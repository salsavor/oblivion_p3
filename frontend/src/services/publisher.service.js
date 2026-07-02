import api from "./api";

class PublisherService {
  async getAll(tipo) {
    const res = await api.get("/publishers", {
      params: tipo ? { tipo } : undefined,
    });
    return res.data.data;
  }

  async create(nome, tipo) {
    const res = await api.post("/publishers", { nome, tipo });
    return res.data.data;
  }
}

export default new PublisherService();
