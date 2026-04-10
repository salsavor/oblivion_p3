const { Sequelize } = require("sequelize");

const conexao = new Sequelize(
  process.env.DB_NAME || "oblivion",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "123",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

module.exports = conexao;
