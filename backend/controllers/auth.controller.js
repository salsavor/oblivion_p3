const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const endpoints = {};

// POST /register
endpoints.register = async (req, res) => {
  const { username, email, password, numero_telefone } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email e password são obrigatórios.",
    });
  }

  try {
    const dados = await User.create({ username, email, password, numero_telefone });
    const { password: _, ...userSafe } = dados.toJSON();

    return res.status(201).json({
      success: true,
      message: "Utilizador criado com sucesso.",
      data: userSafe,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Email ou username já existe.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Erro ao criar utilizador.",
    });
  }
};

// POST /login
endpoints.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email e password são obrigatórios.",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas.",
      });
    }

    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas.",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, admin: user.admin },
      config.secret,
      { expiresIn: config.timer }
    );

    return res.status(200).json({
      success: true,
      message: "Autenticação realizada com sucesso.",
      AccessToken: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro durante a autenticação.",
    });
  }
};

// POST /refresh-token
endpoints.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "Token não fornecido." });
  }

  try {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Token inválido ou expirado." });
      }
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, admin: decoded.admin },
        config.secret,
        { expiresIn: config.timer }
      );
      return res.status(200).json({
        success: true,
        message: "Token renovado com sucesso.",
        AccessToken: newToken,
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Erro ao renovar token." });
  }
};

// POST /logout
endpoints.logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout realizado com sucesso.",
  });
};

module.exports = endpoints;
