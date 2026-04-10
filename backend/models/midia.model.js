const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Midia = db.define(
  "midia",
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
    tipo: {
      type: DataTypes.ENUM("Filme", "Serie", "Anime", "Documentario"),
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
    tableName: "midia",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Midia;
