const express = require('express');
const router = express.Router();

//importação do controller e da middleware
const middleware = require("../middleware");
const professorController = require("../controllers/professor.controller");

router.get("/teachers", professorController.getAllTeachers);
router.get("/teachers/:id", professorController.getTeacherById);
router.post(
  "/teachers",
  middleware.checkToken,
  professorController.createTeacher
);
router.put(
  "/teachers/:id",
  middleware.checkToken,
  professorController.updateTeacher
);
router.delete(
  "/teachers/:id",
  middleware.checkToken,
  professorController.deleteTeacher
);

module.exports = router;