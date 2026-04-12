const { Midia, Publisher, Genero } = require("../models");

const endpoints = {};

const includeOpts = [
  { model: Publisher, as: "publisher" },
  { model: Genero, as: "generos", through: { attributes: [] } },
];

// GET /midia
endpoints.getAllMidia = async (req, res) => {
  try {
    const dados = await Midia.findAll({ include: includeOpts });
    return res
      .status(200)
      .json({ status: "success", message: "Lista de mídia.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Erro ao listar mídia.", data: null });
  }
};

// GET /midia/:id
endpoints.getMidiaById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Midia.findByPk(id, { include: includeOpts });
    if (!dados)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Mídia não encontrada.",
          data: null,
        });
    return res
      .status(200)
      .json({ status: "success", message: "Mídia encontrada.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Erro ao obter mídia.", data: null });
  }
};

// POST /midia
endpoints.createMidia = async (req, res) => {
  const {
    nome,
    tipo,
    descricao,
    ano_lancamento,
    imagem_url,
    publisherId,
    generosIds,
  } = req.body;
  if (!nome || !tipo)
    return res
      .status(400)
      .json({
        status: "error",
        message: "Nome e tipo são obrigatórios.",
        data: null,
      });
  try {
    const midia = await Midia.create({
      nome,
      tipo,
      descricao,
      ano_lancamento,
      imagem_url,
      publisherId,
    });
    if (generosIds && generosIds.length > 0) {
      const generos = await Genero.findAll({ where: { id: generosIds } });
      await midia.setGeneros(generos);
    }
    const dados = await Midia.findByPk(midia.id, { include: includeOpts });
    return res
      .status(201)
      .json({ status: "success", message: "Mídia criada.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Erro ao criar mídia.", data: null });
  }
};

// PUT /midia/:id
endpoints.updateMidia = async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    tipo,
    descricao,
    ano_lancamento,
    imagem_url,
    publisherId,
    generosIds,
  } = req.body;
  try {
    const midia = await Midia.findByPk(id);
    if (!midia)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Mídia não encontrada.",
          data: null,
        });
    await midia.update({
      nome,
      tipo,
      descricao,
      ano_lancamento,
      imagem_url,
      publisherId,
    });
    if (generosIds !== undefined) {
      const generos = await Genero.findAll({ where: { id: generosIds } });
      await midia.setGeneros(generos);
    }
    const dados = await Midia.findByPk(id, { include: includeOpts });
    return res
      .status(200)
      .json({ status: "success", message: "Mídia atualizada.", data: dados });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao atualizar mídia.",
        data: null,
      });
  }
};

// DELETE /midia/:id
endpoints.deleteMidia = async (req, res) => {
  const { id } = req.params;
  try {
    const midia = await Midia.findByPk(id);
    if (!midia)
      return res
        .status(404)
        .json({
          status: "error",
          message: "Mídia não encontrada.",
          data: null,
        });
    await midia.destroy();
    return res
      .status(200)
      .json({ status: "success", message: "Mídia eliminada.", data: null });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Erro ao eliminar mídia.",
        data: null,
      });
  }
};

// GET /midia/publisher/:publisherId
endpoints.getMidiaByPublisher = async (req, res) => {
  const { publisherId } = req.params;
  try {
    const dados = await Midia.findAll({
      where: { publisherId },
      include: includeOpts,
    });
    return res.status(200).json({
      status: "success",
      message: `Midia do publisher #${publisherId}.`,
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao listar midia por publisher.",
      data: null,
    });
  }
};

// GET /midia/genero/:generoId
endpoints.getMidiaByGenero = async (req, res) => {
  const { generoId } = req.params;
  try {
    const dados = await Midia.findAll({
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
      message: `Midia do género #${generoId}.`,
      data: dados,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Erro ao listar midia por género.",
      data: null,
    });
  }
};

module.exports = endpoints;
