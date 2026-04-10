const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Favorito = db.define(
  "favorito",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    tableName: "favoritos",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Favorito;
