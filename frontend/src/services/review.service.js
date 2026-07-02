import api from "./api";

function normalize(dados) {
  return {
    id: dados.id,
    author: dados.user?.username || "Anónimo",
    score: dados.pontuacao,
    titulo: dados.titulo,
    comment: dados.conteudo,
  };
}

class ReviewService {
  async getAll() {
    const res = await api.get("/reviews");
    return res.data.data;
  }

  async getByAlvo(tipo, alvoId) {
    const res = await api.get(`/reviews/alvo/${tipo}/${alvoId}`);
    return res.data.data.map(normalize);
  }

  async create({ titulo, conteudo, pontuacao, tipo_alvo, alvo_id }) {
    const res = await api.post("/reviews", { titulo, conteudo, pontuacao, tipo_alvo, alvo_id });
    return normalize(res.data.data);
  }

  async remove(id) {
    await api.delete(`/reviews/${id}`);
  }
}

export default new ReviewService();
