import api from "./api";

// Mapeia o slug de categoria usado no frontend para o recurso REST
// e para o "tipo_alvo" usado nas reviews/favoritos.
const RESOURCE = { jogos: "jogos", media: "midia", literatura: "literatura" };
export const TIPO_ALVO = {
  jogos: "jogo",
  media: "midia",
  literatura: "literatura",
};

const cover = (text) =>
  `https://placehold.co/500x700/1a1e1e/d50d14?font=roboto&text=${encodeURIComponent(text || "?")}`;

// Uniformiza os 3 modelos (nomes de campos diferentes) para o formato
// que os componentes (ProductCard, ProductDetail) já esperavam do mockData.
function normalize(category, dados) {
  return {
    id: dados.id,
    category,
    name: dados.nome,
    author:
      category === "literatura"
        ? dados.autor || dados.publisher?.nome
        : dados.publisher?.nome,
    year: dados.ano_lancamento ?? dados.ano_publicacao ?? null,
    image: dados.imagem_url || cover(dados.nome),
    description: dados.descricao || "",
    score: null, // calculado a partir das reviews, ver attachScores()
    raw: dados,
  };
}

// Converte o formulário do painel de administração (campos genéricos) para o
// corpo esperado por cada endpoint (nomes de campos diferentes por categoria).
function denormalize(category, form) {
  const base = {
    nome: form.nome,
    descricao: form.descricao || null,
    imagem_url: form.imagem_url || null,
    publisherId: form.publisherId ? Number(form.publisherId) : null,
  };
  if (category === "jogos") {
    return { ...base, ano_lancamento: form.ano ? Number(form.ano) : null };
  }
  if (category === "media") {
    return {
      ...base,
      ano_lancamento: form.ano ? Number(form.ano) : null,
      tipo: form.tipo,
    };
  }
  return {
    ...base,
    ano_publicacao: form.ano ? Number(form.ano) : null,
    autor: form.autor || null,
  };
}

// Junta a pontuação média das reviews a uma lista de itens já normalizados.
export function attachScores(items, reviews, tipo) {
  const stats = {};
  for (const r of reviews) {
    if (tipo && r.tipo_alvo !== tipo) continue;
    const key = r.alvo_id;
    if (!stats[key]) stats[key] = { sum: 0, count: 0 };
    stats[key].sum += r.pontuacao;
    stats[key].count += 1;
  }
  return items.map((item) => {
    const s = stats[item.id];
    return { ...item, score: s ? s.sum / s.count : 0 };
  });
}

class CatalogService {
  async getAll(category) {
    const res = await api.get(`/${RESOURCE[category]}`);
    return res.data.data.map((d) => normalize(category, d));
  }

  async getById(category, id) {
    const res = await api.get(`/${RESOURCE[category]}/${id}`);
    return normalize(category, res.data.data);
  }

  async create(category, form) {
    const res = await api.post(
      `/${RESOURCE[category]}`,
      denormalize(category, form),
    );
    return normalize(category, res.data.data);
  }

  async update(category, id, form) {
    const res = await api.put(
      `/${RESOURCE[category]}/${id}`,
      denormalize(category, form),
    );
    return normalize(category, res.data.data);
  }

  async remove(category, id) {
    await api.delete(`/${RESOURCE[category]}/${id}`);
  }
}

export default new CatalogService();
