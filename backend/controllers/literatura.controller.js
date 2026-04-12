const { Literatura, Publisher, Genero } = require("../models");

const endpoints = {};

const includeOpts = [
  { model: Publisher, as: "publisher" },
  { model: Genero, as: "generos", through: { attributes: [] } },
];

// GET /literatura
endpoints.getAllLiteratura = async (req, res) => {
  try {
    const dados = await Literatura.findAll({ include: includeOpts });
    return res.status(200).json({
      status: "success",
      message: "Lista de literatura.",
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao listar literatura.",
      data: null,
    });
  }
};

// GET /literatura/:id
endpoints.getLiteraturaById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Literatura.findByPk(id, { include: includeOpts });
    if (!dados)
      return res.status(404).json({
        status: "error",
        message: "Literatura não encontrada.",
        data: null,
      });
    return res.status(200).json({
      status: "success",
      message: "Literatura encontrada.",
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao obter literatura.",
      data: null,
    });
  }
};

// POST /literatura
endpoints.createLiteratura = async (req, res) => {
  const {
    nome,
    autor,
    descricao,
    ano_publicacao,
    imagem_url,
    publisherId,
    generosIds,
  } = req.body;
  if (!nome)
    return res
      .status(400)
      .json({ status: "error", message: "Nome é obrigatório.", data: null });
  try {
    const lit = await Literatura.create({
      nome,
      autor,
      descricao,
      ano_publicacao,
      imagem_url,
      publisherId,
    });
    if (generosIds && generosIds.length > 0) {
      const generos = await Genero.findAll({ where: { id: generosIds } });
      await lit.setGeneros(generos);
    }
    const dados = await Literatura.findByPk(lit.id, { include: includeOpts });
    return res
      .status(201)
      .json({ status: "success", message: "Literatura criada.", data: dados });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao criar literatura.",
      data: null,
    });
  }
};

// PUT /literatura/:id
endpoints.updateLiteratura = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    autor,
    descricao,
    ano_publicacao,
    imagem_url,
    publisherId,
    generosIds,
  } = req.body;
  try {
    const lit = await Literatura.findByPk(id);
    if (!lit)
      return res.status(404).json({
        status: "error",
        message: "Literatura não encontrada.",
        data: null,
      });
    await lit.update({
      nome,
      autor,
      descricao,
      ano_publicacao,
      imagem_url,
      publisherId,
    });
    if (generosIds !== undefined) {
      const generos = await Genero.findAll({ where: { id: generosIds } });
      await lit.setGeneros(generos);
    }
    const dados = await Literatura.findByPk(id, { include: includeOpts });
    return res.status(200).json({
      status: "success",
      message: "Literatura atualizada.",
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao atualizar literatura.",
      data: null,
    });
  }
};

// DELETE /literatura/:id
endpoints.deleteLiteratura = async (req, res) => {
  const { id } = req.params;
  try {
    const lit = await Literatura.findByPk(id);
    if (!lit)
      return res.status(404).json({
        status: "error",
        message: "Literatura não encontrada.",
        data: null,
      });
    await lit.destroy();
    return res.status(200).json({
      status: "success",
      message: "Literatura eliminada.",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao eliminar literatura.",
      data: null,
    });
  }
};

// GET /literatura/publisher/:publisherId
endpoints.getLiteraturaByPublisher = async (req, res) => {
  const { publisherId } = req.params;
  try {
    const dados = await Literatura.findAll({
      where: { publisherId },
      include: includeOpts,
    });
    return res.status(200).json({
      status: "success",
      message: `Literatura do publisher #${publisherId}.`,
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao listar literatura por publisher.",
      data: null,
    });
  }
};

// GET /literatura/genero/:generoId
endpoints.getLiteraturaByGenero = async (req, res) => {
  const { generoId } = req.params;
  try {
    const dados = await Literatura.findAll({
      include: [
        { model: Publisher, as: "publisher" },
        {
          model: Genero,
          as: "generos",
          where: { id: generoId },
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json({
      status: "success",
      message: `Literatura do género #${generoId}.`,
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao listar literatura por género.",
      data: null,
    });
  }
};

module.exports = endpoints;
