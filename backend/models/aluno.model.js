const sequelize = require("sequelize");
const conexao = require("../config/database");
const Subject = require("./disciplina.model");

const Student = conexao.define(
    "student",
    {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize.STRING,
            allowNull: false
        },
        address: {
            type: sequelize.STRING,
            allowNull: true
        },
        nif: {
            type: sequelize.INTEGER,
            allowNull: true
        },
    },
    {
        tableName: "student",
        timestamps: true,
        freezeTableName: true
    }
);

// Configuração da relação muitos-para-muitos: Student -> Subject
Student.belongsToMany(Subject, {
    through: "studentSubjects", // Nome da tabela intermediária
    foreignKey: "studentId", // Chave estrangeira para Student
    otherKey: "subjectId", // Chave estrangeira para Subject
});

module.exports = Student;