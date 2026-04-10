const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Review = db.define(
  "review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 10 },
    },
    // Polimorfismo: tipo indica a que entidade pertence
    tipo_alvo: {
      type: DataTypes.ENUM("jogo", "midia", "literatura"),
      allowNull: false,
    },
    alvo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "reviews",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Review;
