const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const reviewController = require("../controllers/review.controller");

router.post("/reviews", middleware.checkToken, reviewController.createReview);

// Obter reviews por tag
router.get("/reviews/alvo/:tipo/:alvoId", reviewController.getReviewsByAlvo);
router.get("/reviews/:id", reviewController.getReviewById);
router.get("/reviews", reviewController.getAllReviews);

router.put(
  "/reviews/:id",
  middleware.checkToken,
  reviewController.updateReview,
);
router.delete(
  "/reviews/:id",
  middleware.checkToken,
  reviewController.deleteReview,
);

module.exports = router;
