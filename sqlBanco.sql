create database gatos;

use gatos;

CREATE TABLE gatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    primeiroNome VARCHAR(50) NOT NULL,
    sobreNome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(10) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
