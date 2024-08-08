const express = require('express');
const router = express.Router();
const GatoController = require('../controllers/GatoController');

router.get('/', GatoController.getGatos);
router.post('/', GatoController.createGato);

module.exports = router