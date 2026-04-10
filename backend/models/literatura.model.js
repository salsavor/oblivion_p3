const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Literatura = db.define(
  "literatura",
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
    autor: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ano_publicacao: {
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
    tableName: "literatura",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Literatura;
