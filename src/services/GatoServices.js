const Gato = require('../models/GatoModel');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const getGatos = (req, res) => {
    //varias linhas de validação de dados e regras
    //usar middleware para atenticar
    //delegar persistencia para camada de acesso a dados
    Gato.findAll()
    .then(gatos => {
        res.json(gatos);
    })
    .catch(erro => {
        res.json(erro);
    })
}

const createGato = (req, res) => {
    const { primeiroNome, sobreNome, email, senha } = req.body;
    const saltRounds = 10;
    bcrypt.hash(senha, saltRounds)
        .then(senhaCriptografada => {
            return Gato.create({
                primeiroNome: primeiroNome,
                sobreNome: sobreNome,
                email: email,
                senha: senhaCriptografada
            });
        })
        .then(gato => {
            res.json({
                message: 'Gato criado com sucesso',
                gato: gato
            });
        })
        .catch(erro => {
            console.log(erro);
            res.json({
                message: 'Erro ao criar gato'
            });
        });
}


module.exports = {
    getGatos,
    createGato
}