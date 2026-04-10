// Este ficheiro centraliza todas as associações entre modelos Sequelize.
// Importar AQUI e apenas aqui para evitar dependências circulares.

const User = require("./user.model");
const Genero = require("./genero.model");
const Publisher = require("./publisher.model");
const Jogo = require("./jogo.model");
const Midia = require("./midia.model");
const Literatura = require("./literatura.model");
const Review = require("./review.model");
const Favorito = require("./favorito.model");

// ── Publisher ──────────────────────────────────────────────
Publisher.hasMany(Jogo, { foreignKey: "publisherId", as: "jogos" });
Jogo.belongsTo(Publisher, { foreignKey: "publisherId", as: "publisher" });

Publisher.hasMany(Midia, { foreignKey: "publisherId", as: "midia" });
Midia.belongsTo(Publisher, { foreignKey: "publisherId", as: "publisher" });

Publisher.hasMany(Literatura, { foreignKey: "publisherId", as: "literatura" });
Literatura.belongsTo(Publisher, { foreignKey: "publisherId", as: "publisher" });

// ── Género (many-to-many) ──────────────────────────────────
Jogo.belongsToMany(Genero, {
  through: "jogo_generos",
  foreignKey: "jogoId",
  otherKey: "generoId",
  as: "generos",
});
Genero.belongsToMany(Jogo, {
  through: "jogo_generos",
  foreignKey: "generoId",
  otherKey: "jogoId",
  as: "jogos",
});

Midia.belongsToMany(Genero, {
  through: "midia_generos",
  foreignKey: "midiaId",
  otherKey: "generoId",
  as: "generos",
});
Genero.belongsToMany(Midia, {
  through: "midia_generos",
  foreignKey: "generoId",
  otherKey: "midiaId",
  as: "midia",
});

Literatura.belongsToMany(Genero, {
  through: "literatura_generos",
  foreignKey: "literaturaId",
  otherKey: "generoId",
  as: "generos",
});
Genero.belongsToMany(Literatura, {
  through: "literatura_generos",
  foreignKey: "generoId",
  otherKey: "literaturaId",
  as: "literatura",
});

// ── Reviews ────────────────────────────────────────────────
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

// ── Favoritos ──────────────────────────────────────────────
User.hasMany(Favorito, { foreignKey: "userId", as: "favoritos" });
Favorito.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = { User, Genero, Publisher, Jogo, Midia, Literatura, Review, Favorito };
