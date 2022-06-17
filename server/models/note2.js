const mongoose = require('mongoose');

const cli = new mongoose.Schema({
	Nome: String,
	CPF: String,
    CEP: String,
    Rua: String,
    Numero: String,
    Bairro: String,
    Complemento: String,
    Contato: String,
    Email: String

});


const client = mongoose.model('clientes', cli);
module.exports = client;