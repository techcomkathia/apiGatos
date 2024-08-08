// const Sequelize = require('sequelize');
// require('dotenv').config();

// const acessoBanco = process.env.ACESSOBANCO;


// const sequelize = new Sequelize(acessoBanco);

// sequelize.authenticate()
//   .then(() => {
//     console.log('Conecção com o banco de dados realizada com sucesso!');
//   })
//   .catch(err => {
//     console.error('Conecção com o banco de dados falhou', err);
//   });

// module.exports = sequelize;


require('dotenv').config({ path: '../.env' });
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     port: process.env.DB_PORT,
//   }
// );

// sequelize.authenticate()
//   .then(() => {
//     console.log('Conexão bem-sucedida com o banco de dados.');
//   })
//   .catch(err => {
//     console.error('Não foi possível conectar ao banco de dados:', err);
//   });

console.log(process.env.ACESSOBANCO);
