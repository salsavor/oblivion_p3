const { Favorito, User } = require("../models");

const endpoints = {};

const TIPOS_VALIDOS = ["jogo", "midia", "literatura"];

// GET /favoritos  — favoritos do user autenticado
endpoints.getMyFavoritos = async (req, res) => {
  const userId = req.decoded.id;
  try {
    const dados = await Favorito.findAll({ where: { userId } });
    return res.status(200).json({ status: "success", message: "Favoritos do utilizador.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao listar favoritos.", data: null });
  }
};

// POST /favoritos
endpoints.addFavorito = async (req, res) => {
  const { tipo_alvo, alvo_id } = req.body;
  const userId = req.decoded.id;

  if (!tipo_alvo || !alvo_id) {
    return res.status(400).json({ status: "error", message: "tipo_alvo e alvo_id são obrigatórios.", data: null });
  }
  if (!TIPOS_VALIDOS.includes(tipo_alvo)) {
    return res.status(400).json({ status: "error", message: "Tipo inválido. Use: jogo, midia ou literatura.", data: null });
  }

  try {
    // Verificar se já existe
    const existe = await Favorito.findOne({ where: { userId, tipo_alvo, alvo_id } });
    if (existe) {
      return res.status(409).json({ status: "error", message: "Já está nos favoritos.", data: null });
    }
    const dados = await Favorito.create({ tipo_alvo, alvo_id, userId });
    return res.status(201).json({ status: "success", message: "Adicionado aos favoritos.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao adicionar favorito.", data: null });
  }
};

// DELETE /favoritos/:id
endpoints.removeFavorito = async (req, res) => {
  const { id } = req.params;
  const userId = req.decoded.id;

  try {
    const favorito = await Favorito.findByPk(id);
    if (!favorito) return res.status(404).json({ status: "error", message: "Favorito não encontrado.", data: null });

    if (favorito.userId !== userId && !req.decoded.admin) {
      return res.status(403).json({ status: "error", message: "Sem permissão.", data: null });
    }

    await favorito.destroy();
    return res.status(200).json({ status: "success", message: "Removido dos favoritos.", data: null });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao remover favorito.", data: null });
  }
};

module.exports = endpoints;
