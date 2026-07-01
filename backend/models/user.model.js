const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    freezeTableName: true,
  },
);

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((error) => {
      throw new Error("Erro ao gerar o hash: " + error.message);
    });
});

User.beforeUpdate((user, options) => {
  if (user.changed("password")) {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((error) => {
        throw new Error("Erro ao gerar o hash: " + error.message);
      });
  }
});

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
