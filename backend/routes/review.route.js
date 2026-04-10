const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const reviewController = require("../controllers/review.controller");

router.get("/reviews", reviewController.getAllReviews);
router.get("/reviews/:id", reviewController.getReviewById);
// Obter reviews por alvo: /reviews/alvo/jogo/1
router.get("/reviews/alvo/:tipo/:alvoId", reviewController.getReviewsByAlvo);
router.post("/reviews", middleware.checkToken, reviewController.createReview);
router.put("/reviews/:id", middleware.checkToken, reviewController.updateReview);
router.delete("/reviews/:id", middleware.checkToken, reviewController.deleteReview);

module.exports = router;
