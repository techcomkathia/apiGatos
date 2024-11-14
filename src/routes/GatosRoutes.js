const express = require('express');
const router = express.Router();
const GatoController = require('../controllers/GatoController');
const verificarToken = require('../middleware/authMiddleware');

//rota protegida
//path, middleware de autenticação, controlador
router.post('/', verificarToken, GatoController.getGatos);

//rota publica
//path, controlador
router.get('/', verificarToken, GatoController.getGatos);
router.post('/login/', GatoController.loginGato);
module.exports = router