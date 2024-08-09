const express = require('express');
const gatosRoutes = require('./routes/GatosRoutes');
const verificarToken = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo a api do Cleitinho',
        version: '1.0.0',
        autor: 'Cleitinho'
    });
});

app.use('/gatos', gatosRoutes);

module.exports = app;