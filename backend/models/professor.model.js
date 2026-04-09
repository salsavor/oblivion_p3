const sequelize = require("sequelize");
const conexao = require("../config/database");

const Teacher = conexao.define(
  "teacher",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    nif: {
      type: sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "teacher",
    timestamps: true,
    freezeTableName: true
  }
);

module.exports = Teacher;
