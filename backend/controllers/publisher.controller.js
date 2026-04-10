const { Publisher, Jogo } = require("../models");

const endpoints = {};

// GET /publishers
endpoints.getAllPublishers = async (req, res) => {
  try {
    const dados = await Publisher.findAll();
    return res
      .status(200)
      .json({
        status: "success",
        message: "Lista de publishers.",
        data: dados,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao listar publishers.",
        data: null,
      });
  }
};

// GET /publishers/:id
endpoints.getPublisherById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Publisher.findByPk(id, {
      include: [{ model: Jogo, as: "jogos" }],
    });
    if (!dados)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Publisher não encontrado.",
          data: null,
        });
    return res
      .status(200)
      .json({
        status: "success",
        message: "Publisher encontrado.",
        data: dados,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao obter publisher.",
        data: null,
      });
  }
};

// POST /publishers
endpoints.createPublisher = async (req, res) => {
  const { nome, bio } = req.body;
  if (!nome)
    return res
      .status(400)
      .json({ status: "error", message: "Nome é obrigatório.", data: null });
  try {
    const dados = await Publisher.create({ nome, bio });
    return res
      .status(201)
      .json({ status: "success", message: "Publisher criado.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao criar publisher.",
        data: null,
      });
  }
};

// PUT /publishers/:id
endpoints.updatePublisher = async (req, res) => {
  const { id } = req.params;
  const { nome, bio } = req.body;
  try {
    const publisher = await Publisher.findByPk(id);
    if (!publisher)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Publisher não encontrado.",
          data: null,
        });
    await publisher.update({ nome, bio });
    return res
      .status(200)
      .json({
        status: "success",
        message: "Publisher atualizado.",
        data: publisher,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao atualizar publisher.",
        data: null,
      });
  }
};

// DELETE /publishers/:id
endpoints.deletePublisher = async (req, res) => {
  const { id } = req.params;
  try {
    const publisher = await Publisher.findByPk(id);
    if (!publisher)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Publisher não encontrado.",
          data: null,
        });
    await publisher.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Publisher eliminado.", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao eliminar publisher.",
        data: null,
      });
  }
};

module.exports = endpoints;
