const { Review, User } = require("../models");

const endpoints = {};

const TIPOS_VALIDOS = ["jogo", "midia", "literatura"];

// GET /reviews
endpoints.getAllReviews = async (req, res) => {
  try {
    const dados = await Review.findAll({
      include: [{ model: User, as: "user", attributes: ["id", "username"] }],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ status: "success", message: "Lista de reviews.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao listar reviews.", data: null });
  }
};

// GET /reviews/:id
endpoints.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Review.findByPk(id, {
      include: [{ model: User, as: "user", attributes: ["id", "username"] }],
    });
    if (!dados) return res.status(404).json({ status: "error", message: "Review não encontrada.", data: null });
    return res.status(200).json({ status: "success", message: "Review encontrada.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao obter review.", data: null });
  }
};

// GET /reviews/alvo/:tipo/:alvoId  — todas as reviews de um jogo/midia/literatura
endpoints.getReviewsByAlvo = async (req, res) => {
  const { tipo, alvoId } = req.params;
  if (!TIPOS_VALIDOS.includes(tipo)) {
    return res.status(400).json({ status: "error", message: "Tipo inválido. Use: jogo, midia ou literatura.", data: null });
  }
  try {
    const dados = await Review.findAll({
      where: { tipo_alvo: tipo, alvo_id: alvoId },
      include: [{ model: User, as: "user", attributes: ["id", "username"] }],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ status: "success", message: `Reviews de ${tipo} #${alvoId}.`, data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao listar reviews.", data: null });
  }
};

// POST /reviews
endpoints.createReview = async (req, res) => {
  const { titulo, conteudo, pontuacao, tipo_alvo, alvo_id } = req.body;
  const userId = req.decoded.id;

  if (!titulo || !conteudo || !pontuacao || !tipo_alvo || !alvo_id) {
    return res.status(400).json({ status: "error", message: "Todos os campos são obrigatórios.", data: null });
  }
  if (!TIPOS_VALIDOS.includes(tipo_alvo)) {
    return res.status(400).json({ status: "error", message: "Tipo inválido. Use: jogo, midia ou literatura.", data: null });
  }
  if (pontuacao < 1 || pontuacao > 10) {
    return res.status(400).json({ status: "error", message: "Pontuação deve ser entre 1 e 10.", data: null });
  }

  try {
    const dados = await Review.create({ titulo, conteudo, pontuacao, tipo_alvo, alvo_id, userId });
    return res.status(201).json({ status: "success", message: "Review criada.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao criar review.", data: null });
  }
};

// PUT /reviews/:id
endpoints.updateReview = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, pontuacao } = req.body;
  const userId = req.decoded.id;

  try {
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ status: "error", message: "Review não encontrada.", data: null });

    // Só o autor ou admin podem editar
    if (review.userId !== userId && !req.decoded.admin) {
      return res.status(403).json({ status: "error", message: "Sem permissão para editar esta review.", data: null });
    }

    await review.update({ titulo, conteudo, pontuacao });
    return res.status(200).json({ status: "success", message: "Review atualizada.", data: review });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao atualizar review.", data: null });
  }
};

// DELETE /reviews/:id
endpoints.deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.decoded.id;

  try {
    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ status: "error", message: "Review não encontrada.", data: null });

    if (review.userId !== userId && !req.decoded.admin) {
      return res.status(403).json({ status: "error", message: "Sem permissão para eliminar esta review.", data: null });
    }

    await review.destroy();
    return res.status(200).json({ status: "success", message: "Review eliminada.", data: null });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao eliminar review.", data: null });
  }
};

module.exports = endpoints;
