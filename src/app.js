const express = require('express');
const gatosRoutes = require('./routes/GatosRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo a api do Cleitinho',
        version: '1.0.0',
        autor: 'Cleitinho'
    });
});

app.use('/gato', gatosRoutes);

module.exports = app;