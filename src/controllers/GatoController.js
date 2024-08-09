const GatoServices = require('../services/GatoServices');


const getGatos = (req, res) => {
   GatoServices.getGatos(req, res)
}

const createGato = (req, res) => {
   GatoServices.createGato(req, res)
}

const loginGato = (req, res) => {
    GatoServices.login(req, res)
}
module.exports = {
    getGatos,
    createGato,
    loginGato
}