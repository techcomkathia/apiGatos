const express = require('express');
const router = express.Router();
const GatoController = require('../controllers/GatoController');
const verificarToken = require('../middleware/authMiddleware');

//rota protegida
router.get('/', verificarToken, GatoController.getGatos);
//rota publica
router.post('/', GatoController.createGato);
router.post('/login/', GatoController.loginGato);
module.exports = router