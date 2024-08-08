const GatoServices = require('../services/GatoServices');


const getGatos = (req, res) => {
   GatoServices.getGatos(req, res)
}

const createGato = (req, res) => {
   GatoServices.createGato(req, res)
}

module.exports = {
    getGatos,
    createGato
}