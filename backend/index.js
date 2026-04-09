const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require("./config/database");
const port = 5000;

app.set("port", process.env.PORT || port);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync(); //verifica a base de dados

app.use("/api/v1", require("./routes/aluno.route.js"));
app.use("/api/v1", require("./routes/professor.route.js"));
app.use("/api/v1", require("./routes/disciplina.route.js"));
app.use("/api/v1", require("./routes/auth.route"));

app.listen(app.get("port"), () => {
    console.log("Servidor a correr na porta "+app.get("port"));
});