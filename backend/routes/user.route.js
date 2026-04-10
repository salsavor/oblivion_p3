const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const userController = require("../controllers/user.controller");

router.get("/users", middleware.checkToken, userController.getAllUsers);
router.get("/users/:id", middleware.checkToken, userController.getUserById);
router.put("/users/:id", middleware.checkToken, userController.updateUser);
router.delete("/users/:id", middleware.checkToken, userController.deleteUser);

module.exports = router;
