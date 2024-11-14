const Gato = require('../models/GatoModel');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/authMiddleware');


app.use(express.json());

const getGatos = (req, res) => {
    //varias linhas de validação de dados e regras
    //usar middleware para atenticar
    //delegar persistencia para camada de acesso a dados
    Gato.findAll()
    .then(gatos => {
        res.json({statusCode: 200, 
            dados: gatos});
    })
    .catch(erro => {
res.status(500).json({ message: 'Erro ao buscar gatos', erro });    })
}

const createGato = async (req, res) => {
    const { primeiroNome, sobreNome, email, senha } = req.body;
    const saltRounds = 10;

    try {
        // Verificar se o e-mail já existe
        const gatoExistente = await Gato.findOne({ where: { email: email } });
        if (gatoExistente) {
            return res.status(400).json({
                message: 'E-mail já cadastrado'
            });
        }

        // Criptografar a senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        // Criar um novo gato
        const novoGato = await Gato.create({
            primeiroNome: primeiroNome,
            sobreNome: sobreNome,
            email: email,
            senha: senhaCriptografada
        });

        res.json({
            message: 'Gato criado com sucesso',
            gato: novoGato
        });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({
            message: 'Erro ao criar gato'
        });
    }
};



const login = async(req, res) => {
    try {
    const { email, senha } = req.body;
    // console.log('Email fornecido:', email);
    // console.log('Senha fornecida:', senha);
    const gato = await Gato.findOne({ where: { email: email },  attributes: ['id', 'primeiroNome', 'sobreNome', 'email', 'senha'] })
    // console.log('Gato encontrado:', gato);
    // console.log('Gato encontrado:', gato.dataValues);

    if (!gato) {
        return res.status(401).json({ message: 'Email inválido' })
    }

    //caso o email esteja correto verificar a senha
    //bycrypt.compare retorna true ou false
    const senhaCorreta = await bcrypt.compare(senha, gato.dataValues.senha)

    // caso senhaCorreta seja falso
    if (!senhaCorreta) {
        return res.status(401).json({ message: 'senha inválida' })
    }

    //caso senha correta gerar o token
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