const { Jogo, Publisher, Genero } = require("../models");

const endpoints = {};

const includeOpts = [
  { model: Publisher, as: "publisher" },
  { model: Genero, as: "generos", through: { attributes: [] } },
];

// GET /jogos
endpoints.getAllJogos = async (req, res) => {
  try {
    const dados = await Jogo.findAll({ include: includeOpts });
    return res.status(200).json({ status: "success", message: "Lista de jogos.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao listar jogos.", data: null });
  }
};

// GET /jogos/:id
endpoints.getJogoById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Jogo.findByPk(id, { include: includeOpts });
    if (!dados) return res.status(404).json({ status: "error", message: "Jogo não encontrado.", data: null });
    return res.status(200).json({ status: "success", message: "Jogo encontrado.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao obter jogo.", data: null });
  }
};

// POST /jogos
endpoints.createJogo = async (req, res) => {
  const { nome, descricao, ano_lancamento, imagem_url, publisherId, generosIds } = req.body;
  if (!nome) return res.status(400).json({ status: "error", message: "Nome é obrigatório.", data: null });
  try {
    const jogo = await Jogo.create({ nome, descricao, ano_lancamento, imagem_url, publisherId });
    // Associar géneros (array de IDs)
    if (generosIds && generosIds.length > 0) {
      const generos = await Genero.findAll({ where: { id: generosIds } });
      await jogo.setGeneros(generos);
    }
    const dados = await Jogo.findByPk(jogo.id, { include: includeOpts });
    return res.status(201).json({ status: "success", message: "Jogo criado.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao criar jogo.", data: null });
  }
};

// PUT /jogos/:id
endpoints.updateJogo = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, ano_lancamento, imagem_url, publisherId, generosIds } = req.body;
  try {
    const jogo = await Jogo.findByPk(id);
    if (!jogo) return res.status(404).json({ status: "error", message: "Jogo não encontrado.", data: null });
    await jogo.update({ nome, descricao, ano_lancamento, imagem_url, publisherId });
    if (generosIds !== undefined) {
      const generos = await Genero.findAll({ where: { id: generosIds } });
      await jogo.setGeneros(generos);
    }
    const dados = await Jogo.findByPk(id, { include: includeOpts });
    return res.status(200).json({ status: "success", message: "Jogo atualizado.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao atualizar jogo.", data: null });
  }
};

// DELETE /jogos/:id
endpoints.deleteJogo = async (req, res) => {
  const { id } = req.params;
  try {
    const jogo = await Jogo.findByPk(id);
    if (!jogo) return res.status(404).json({ status: "error", message: "Jogo não encontrado.", data: null });
    await jogo.destroy();
    return res.status(200).json({ status: "success", message: "Jogo eliminado.", data: null });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao eliminar jogo.", data: null });
  }
};

module.exports = endpoints;
