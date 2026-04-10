const { User } = require("../models");

const endpoints = {};

// GET /users
endpoints.getAllUsers = async (req, res) => {
  try {
    const dados = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json({ status: "success", message: "Lista de utilizadores.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao listar utilizadores.", data: null });
  }
};

// GET /users/:id
endpoints.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const dados = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!dados) {
      return res.status(404).json({ status: "error", message: "Utilizador não encontrado.", data: null });
    }
    return res.status(200).json({ status: "success", message: "Utilizador encontrado.", data: dados });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao obter utilizador.", data: null });
  }
};

// PUT /users/:id
endpoints.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, numero_telefone } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "Utilizador não encontrado.", data: null });
    }
    await user.update({ username, email, numero_telefone });
    const { password: _, ...userSafe } = user.toJSON();
    return res.status(200).json({ status: "success", message: "Utilizador atualizado.", data: userSafe });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao atualizar utilizador.", data: null });
  }
};

// DELETE /users/:id
endpoints.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "Utilizador não encontrado.", data: null });
    }
    await user.destroy();
    return res.status(200).json({ status: "success", message: "Utilizador eliminado.", data: null });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Erro ao eliminar utilizador.", data: null });
  }
};

module.exports = endpoints;
