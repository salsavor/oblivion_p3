const { Genero } = require("../models");

const endpoints = {};

// GET /generos
endpoints.getAllGeneros = async (req, res) => {
  try {
    const dados = await Genero.findAll();
    return res
      .status(200)
      .json({ status: "success", message: "Lista de géneros.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao listar géneros.",
        data: null,
      });
  }
};

// GET /generos/:id
endpoints.getGeneroById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Genero.findByPk(id);
    if (!dados)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Género não encontrado.",
          data: null,
        });
    return res
      .status(200)
      .json({ status: "success", message: "Género encontrado.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Erro ao obter género.", data: null });
  }
};

// POST /generos
endpoints.createGenero = async (req, res) => {
  const { nome } = req.body;
  if (!nome)
    return res
      .status(400)
      .json({ status: "error", message: "Nome é obrigatório.", data: null });
  try {
    const dados = await Genero.create({ nome });
    return res
      .status(201)
      .json({ status: "success", message: "Género criado.", data: dados });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ status: "error", message: "Género já existe.", data: null });
    }
    return res
      .status(500)
      .json({ status: "error", message: "Erro ao criar género.", data: null });
  }
};

// PUT /generos/:id
endpoints.updateGenero = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const genero = await Genero.findByPk(id);
    if (!genero)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Género não encontrado.",
          data: null,
        });
    await genero.update({ nome });
    return res
      .status(200)
      .json({ status: "success", message: "Género atualizado.", data: genero });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao atualizar género.",
        data: null,
      });
  }
};

// DELETE /generos/:id
endpoints.deleteGenero = async (req, res) => {
  const { id } = req.params;
  try {
    const genero = await Genero.findByPk(id);
    if (!genero)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Género não encontrado.",
          data: null,
        });
    await genero.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Género eliminado.", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao eliminar género.",
        data: null,
      });
  }
};

module.exports = endpoints;
