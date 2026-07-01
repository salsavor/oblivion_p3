const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const literaturaController = require("../controllers/literatura.controller");

router.post(
  "/literatura",
  middleware.checkToken,
  literaturaController.createLiteratura,
);

router.get(
  "/literatura/publisher/:publisherId",
  literaturaController.getLiteraturaByPublisher,
);
router.get(
  "/literatura/genero/:generoId",
  literaturaController.getLiteraturaByGenero,
);
router.get("/literatura/:id", literaturaController.getLiteraturaById);
router.get("/literatura", literaturaController.getAllLiteratura);

router.put(
  "/literatura/:id",
  middleware.checkToken,
  literaturaController.updateLiteratura,
);
router.delete(
  "/literatura/:id",
  middleware.checkToken,
  literaturaController.deleteLiteratura,
);

module.exports = router;
