const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const midiaController = require("../controllers/midia.controller");

router.get("/midia", midiaController.getAllMidia);
router.get("/midia/:id", midiaController.getMidiaById);
router.post("/midia", middleware.checkToken, midiaController.createMidia);
router.put("/midia/:id", middleware.checkToken, midiaController.updateMidia);
router.delete("/midia/:id", middleware.checkToken, midiaController.deleteMidia);
router.get("/midia/publisher/:publisherId", midiaController.getMidiaByPublisher);
router.get("/midia/genero/:generoId", midiaController.getMidiaByGenero);

module.exports = router;
