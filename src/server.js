const app = require('./app');
const express = require('express');
app.use(express.json());

app.listen(4000, () => {
    console.log('Servidor iniciado na porta 4000');
});