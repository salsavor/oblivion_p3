const Professor = require("../models/professor.model");

const endpoints = {};

// Criar um novo professor
endpoints.createTeacher = async (req, res) => {
  const { name, email, nif } = req.body;

  try {
    const dados = await Professor.create({ name, email, nif });

    res.status(201).json({
      status: "success",
      message: "Professor criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao criar professor.",
      data: null,
    });
  }
};

// Obter todos os professores
endpoints.getAllTeachers = async (req, res) => {
  try {
    const dados = await Professor.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de professores.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar professores.",
      data: null,
    });
  }
};

// Obter um professor pelo ID
endpoints.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const dados = await Professor.findById(id);

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Professor não encontrado.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Professor encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar professores.",
      data: null,
    });
  }
};

// Atualizar um professor pelo ID
endpoints.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, nif } = req.body;

  try {
    const dados = await Professor.findByIdAndUpdate(id, { name, email, nif });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Professor não encontrada.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Professor atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar professor.",
      data: null,
    });
  }
};

// Excluir um professor pelo ID
endpoints.deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const dados = await Professor.findByIdAndDelete(id);

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Professor não encontrada.",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Professor eliminado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao eliminar professor.",
      data: null,
    });
  }
};

module.exports = endpoints;
