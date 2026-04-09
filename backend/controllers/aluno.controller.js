const Aluno = require("../models/aluno.model");
const Disciplina = require("../models/disciplina.model");

const endpoints = {};

// método para criar um estudante
endpoints.createStudent = async (req, res) => {
  const { name, address, nif } = req.body;
  console.log(name, address, nif);
  try {
    const dados = await Aluno.create({
      name: name,
      address: address,
      nif: nif,
    });

    res.status(201).json({
      status: "success",
      message: "Estudante criado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Ocorreu um erro ao criar estudante.",
      data: null,
    });
  }
};

//método que retorna todos os estudantes
endpoints.getAllStudents = async (req, res) => {
  try {
    const dados = await Aluno.findAll();

    res.status(200).json({
      status: "success",
      message: "Lista de estudantes.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar estudantes.",
      data: null,
    });
  }
};

//método que atualiza dos dados do estudante de acordo com o seu ID
endpoints.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, address, nif } = req.body;

  try {
    const dados = await Aluno.update(
      {
        name: name,
        address: address,
        nif: nif,
      },
      {
        where: { id: id },
      }
    );
    /*if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Estudante não encontrado.",
      });
    }*/
    res.status(200).json({
      status: "success",
      message: "Estudante atualizado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao atualizar estudante.",
      data: null,
    });
  }
};

//método que apaga os dados de um estudante de acordo com o seu ID
endpoints.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Aluno.destroy({
      where: { id: id },
    });

    res.status(204).json({
      status: "success",
      message: "Estudante apagado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao apagar estudante.",
      data: null,
    });
  }
};

//método que retorna os dados de um estudante de acordo com o seu ID
endpoints.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Aluno.findOne({
      where: { id: id },
    });
    /*if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Estudante não encontrado.",
      });
    }*/

    res.status(200).json({
      status: "success",
      message: "Estudante encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar estudante.",
      data: null,
    });
  }
};

//método que retorna os dados de um estudante de acordo com o seu nome
endpoints.getStudentByName = async (req, res) => {
  const { name } = req.params;
  try {
    const dados = await Aluno.findOne({
      where: { name: name },
    });
    /*if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Estudante não encontrado.",
      });
    }*/

    res.status(200).json({
      status: "success",
      message: "Estudante encontrado com sucesso.",
      data: dados,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar estudante.",
      data: null,
    });
  }
};

// método que retorna todas as disciplinas de um estudante de acordo com o seu ID
endpoints.getSubjectsEnrolledByStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await Aluno.findOne({
      where: { id: id },
      include: ["subjects"],
    });

    if (!dados) {
      return res.status(404).json({
        status: "error",
        message: "Estudante não encontrado.",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Disciplinas encontradas com sucesso.",
      data: dados.subjects,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao listar disciplinas.",
      data: null,
    });
  }
};

// método que adiciona uma disciplina a um estudante de acordo com os seus ID's
endpoints.addSubjectToStudent = async (req, res) => {
  const { id } = req.params;
  const { subjectId } = req.body;

  try {
    // Verifica se o estudante existe
    const student = await Aluno.findByPk(id);
    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Estudante não encontrado.",
      });
    }

    // Verifica se a disciplina existe
    const subject = await Disciplina.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({
        status: "error",
        message: "Disciplina não encontrada.",
      });
    }

    // Adiciona a disciplina ao estudante
    await student.addSubject(subject);

    res.status(200).json({
      status: "success",
      message: "Disciplina adicionada ao estudante com sucesso.",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocorreu um erro ao adicionar a disciplina ao estudante.",
      details: error.message,
    });
  }
};

module.exports = endpoints;