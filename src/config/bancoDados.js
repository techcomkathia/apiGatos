const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       dialect: process.env.DB_DIALECT,
//       logging: false, // Para desativar logs SQL no console (opcional)
//   }
// );

const sequelize = new Sequelize('gatos',
  'root', 'km2015km', 
  {
      host: '127.0.0.1',
      port: '3306',
      dialect: 'mysql',
      logging: false, // Para desativar logs SQL no console (opcional)
  }
);

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

