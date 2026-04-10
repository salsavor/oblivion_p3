const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Genero = db.define(
  "genero",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "generos",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Genero;
