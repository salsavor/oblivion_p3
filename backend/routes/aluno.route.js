const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/aluno.controller');

const middlewareAuth = require('../middleware');

//rotas da API para o aluno
router.get('/students', middlewareAuth.checkToken, alunoController.getAllStudents);
router.get('/students/:id', middlewareAuth.checkToken, alunoController.getStudentById);
router.post('/students', middlewareAuth.checkToken, alunoController.createStudent);
router.put('/students/:id', middlewareAuth.checkToken, alunoController.updateStudent);
router.delete('/students/:id', middlewareAuth.checkToken, alunoController.deleteStudent);
router.get('/students/:name', middlewareAuth.checkToken, alunoController.getStudentByName);
router.get('/students/:id/subjects', middlewareAuth.checkToken, alunoController.getSubjectsEnrolledByStudent);

module.exports = router;