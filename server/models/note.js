const mongoose = require('mongoose');

const ped = new mongoose.Schema({
	Nome: String,
	CPF: String,
    CEP: String,
    Rua: String,
    Numero: String,
    Bairro: String,
    Complemento: String,
    Tipo: String,
    Tamanho: String,
    Quantidade: String,

});

const pedido = mongoose.model('pedidos', ped);
module.exports = pedido;