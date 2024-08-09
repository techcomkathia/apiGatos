const Gato = require('../models/GatoModel');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


const login = async(req, res) => {
    try {
    const { email, senha } = req.body;
    console.log('Email fornecido:', email);
    console.log('Senha fornecida:', senha);
    const gato = await Gato.findOne({ where: { email: email },  attributes: ['id', 'primeiroNome', 'sobreNome', 'email', 'senha'] })
    console.log('Gato encontrado:', gato);
    console.log('Gato encontrado:', gato.dataValues);

    if (!gato) {
        return res.status(401).json({ message: 'Email ou senha inválidos' })
    }

    const senhaCorreta = await bcrypt.compare(senha, gato.dataValues.senha)
    console.log('Senha :', senha);
    console.log('Senha :', gato.dataValues.senha);
    console.log('Senha Correta:', senhaCorreta);
    if (!senhaCorreta) {
        return res.status(401).json({ message: 'senha inválida' })
    }
    const token = jwt.sign({ id: gato.dataValues.id, email: gato.dataValues.email }, 'your-secret-key', { expiresIn: '1h' })
    res.status(200).json(
        {
            message: 'Login realizado com sucesso', 
            token: token 
        })  
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login' })
    }
}


module.exports = {
    getGatos,
    createGato,
    login
}