const app = require('./app');
const express = require('express');
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});