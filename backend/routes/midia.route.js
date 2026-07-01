const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const midiaController = require("../controllers/midia.controller");

router.post("/midia", middleware.checkToken, midiaController.createMidia);

router.get(
  "/midia/publisher/:publisherId",
  midiaController.getMidiaByPublisher,
);
router.get("/midia/genero/:generoId", midiaController.getMidiaByGenero);
router.get("/midia/:id", midiaController.getMidiaById);
router.get("/midia", midiaController.getAllMidia);

router.delete("/midia/:id", middleware.checkToken, midiaController.deleteMidia);
router.put("/midia/:id", middleware.checkToken, midiaController.updateMidia);

module.exports = router;
