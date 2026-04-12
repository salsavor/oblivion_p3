const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const jogoController = require("../controllers/jogo.controller");

router.get("/jogos", jogoController.getAllJogos);
router.get("/jogos/:id", jogoController.getJogoById);
router.post("/jogos", middleware.checkToken, jogoController.createJogo);
router.put("/jogos/:id", middleware.checkToken, jogoController.updateJogo);
router.delete("/jogos/:id", middleware.checkToken, jogoController.deleteJogo);
router.get("/jogos/publisher/:publisherId", jogoController.getJogosByPublisher);
router.get("/jogos/genero/:generoId", jogoController.getJogosByGenero);

module.exports = router;
