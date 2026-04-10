const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const generoController = require("../controllers/genero.controller");

router.get("/generos", generoController.getAllGeneros);
router.get("/generos/:id", generoController.getGeneroById);
router.post("/generos", middleware.checkToken, generoController.createGenero);
router.put(
  "/generos/:id",
  middleware.checkToken,
  generoController.updateGenero,
);
router.delete(
  "/generos/:id",
  middleware.checkToken,
  generoController.deleteGenero,
);

module.exports = router;
