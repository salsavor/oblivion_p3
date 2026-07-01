const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const publisherController = require("../controllers/publisher.controller");

router.post(
  "/publishers",
  middleware.checkToken,
  publisherController.createPublisher,
);

router.get("/publishers/:id", publisherController.getPublisherById);
router.get("/publishers", publisherController.getAllPublishers);

router.put(
  "/publishers/:id",
  middleware.checkToken,
  publisherController.updatePublisher,
);
router.delete(
  "/publishers/:id",
  middleware.checkToken,
  publisherController.deletePublisher,
);

module.exports = router;
