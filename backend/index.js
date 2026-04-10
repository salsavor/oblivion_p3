const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Carregar todos os modelos e associações
require("./models/index");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rotas
app.use("/api/v1", require("./routes/auth.route"));
app.use("/api/v1", require("./routes/user.route"));
app.use("/api/v1", require("./routes/genero.route"));
app.use("/api/v1", require("./routes/publisher.route"));
app.use("/api/v1", require("./routes/jogo.route"));
app.use("/api/v1", require("./routes/midia.route"));
app.use("/api/v1", require("./routes/literatura.route"));
app.use("/api/v1", require("./routes/review.route"));
app.use("/api/v1", require("./routes/favorito.route"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Oblivion API v1 a funcionar." });
});

// 404
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "Rota nao encontrada." });
});

// Sincronizar BD e arrancar
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de dados sincronizada.");
    app.listen(PORT, () => {
      console.log("Servidor Oblivion a correr em http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar a base de dados:", err.message);
    process.exit(1);
  });
