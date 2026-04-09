const sequelize = require('sequelize');

const conexao = new sequelize("projeto_aulas", "root", "123", {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

module.exports = conexao;