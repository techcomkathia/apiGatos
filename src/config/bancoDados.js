const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.ACESSOBANCO);

//const sequelize = new Sequelize('mysql://root:ZRHvKIKzFEqVazUVfbIeGWOojTHemPoK@roundhouse.proxy.rlwy.net:43477/railway')

sequelize.authenticate()
  .then(() => {    
    console.log('Conexão bem-sucedida com o banco de dados.')
    // console.log(process.env.ACESSOBANCO);
  }).catch(err => {
    // console.log(process.env.ACESSOBANCO)
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;

//COMANDO PARA EXECUTAR O ARQUIVO 
//node --env-file=../.env server.js

