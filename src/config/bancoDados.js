const Sequelize = require('sequelize');
require('dotenv').config({ path: '../.env' });


// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     port: process.env.DB_PORT,
//   }
// );

const sequelize = new Sequelize("mysql://root:ZRHvKIKzFEqVazUVfbIeGWOojTHemPoK@roundhouse.proxy.rlwy.net:43477/railway")

sequelize.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida com o banco de dados.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;

