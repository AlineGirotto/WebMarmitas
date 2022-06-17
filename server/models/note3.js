const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mar = new mongoose.Schema({
	Tipo: String,
	Valor: String,
    Observacao: String

});


const marm = mongoose.model('marmitas', mar);
module.exports = marm;
