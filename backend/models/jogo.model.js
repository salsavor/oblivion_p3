const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Jogo = db.define(
  "jogo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ano_lancamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imagem_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    publisherId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "jogos",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Jogo;
