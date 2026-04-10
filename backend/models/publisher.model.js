const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Publisher = db.define(
  "publisher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "publishers",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Publisher;
