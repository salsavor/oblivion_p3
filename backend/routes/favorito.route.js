const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const favoritoController = require("../controllers/favorito.controller");

// Todos os endpoints de favoritos requerem autenticação
router.get("/favoritos", middleware.checkToken, favoritoController.getMyFavoritos);
router.get("/favoritos/user/:userId", middleware.checkToken, favoritoController.getFavoritosByUser);
router.delete("/favoritos/:id", middleware.checkToken, favoritoController.removeFavorito);
router.post("/favoritos", middleware.checkToken, favoritoController.addFavorito);

module.exports = router;
