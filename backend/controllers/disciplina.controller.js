const Disciplina = require("../models/disciplina.model");

const endpoints = {};

// Criar uma nova disciplina
endpoints.createSubject = async (req, res) => {
  const { name, totalHours } = req.body;

  try {
    const dados = await Disciplina.create({ name, totalHours });

    res.status(201).json({
      status: "success",
      message: "Disciplina criada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar disciplina.",
      data: null,
    });
  }
};

// Obter todas as disciplinas
endpoints.getAllSubjects = async (req, res) => {
  try {
    const dados = await Disciplina.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de disciplinas.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar disciplinas.",
      data: null,
    });
  }
};

// Obter uma disciplina pelo ID
endpoints.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = await Disciplina.findById(id);

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Disciplina não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Disciplina encontrada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar disciplinas.",
      data: null,
    });
  }
};

// Atualizar uma disciplina pelo ID
endpoints.updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name, totalHours } = req.body;

  try {
    const dados = await Disciplina.findByIdAndUpdate(
      id,
      { name: name },
      { totalHours: totalHours }
    );

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Disciplina não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Disciplina atualizada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar disciplina.",
      data: null,
    });
  }
};

// Excluir uma disciplina pelo ID
endpoints.deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Disciplina.findByIdAndDelete(id);

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Disciplina não encontrada.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Disciplina eliminada com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao eliminar disciplina.",
      data: null,
    });
  }
};

module.exports = endpoints;
