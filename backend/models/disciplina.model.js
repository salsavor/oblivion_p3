const sequelize = require("sequelize");
const conexao = require("../config/database");
const Teacher = require("./professor.model");

// Definição do modelo "Subject"
const Subject = conexao.define(
  "subject",
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
    totalHours: {
      type: sequelize.INTEGER,
      allowNull: false,
      field: "total_hours",
    },
  },
  {
    tableName: "subject",
    timestamps: true,
    freezeTableName: true
  }
);

// Relação muitos para 1: Subject -> Teacher
Subject.belongsTo(Teacher, {
  foreignKey: "teacherId", // Nome da chave estrangeira na tabela Subject
  targetKey: "id", // Chave primária no modelo Teacher
  as: "teacher", // Alias para a relação
});

module.exports = Subject;
