const Note = require('../models/note');
const Note2 = require('../models/note2');
const Note3 = require('../models/note3');

const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/").get(function (req, res) {
  res.render('home', { title: 'home', message: null });
});

recordRoutes.route("/record/addPed").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    Nome: req.body.Nome,
    CPF: req.body.CPF,
    CEP: req.body.CEP,
    Rua: req.body.Rua,
    Numero: req.body.Numero,
    Bairro: req.body.Bairro,
    Complemento: req.body.Complemento,
    Tipo: req.body.Tipo,
    Tamanho: req.body.Tamanho,
    Quantidade: req.body.Quantidade,
  };
  
  db_connect.collection("pedidos").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });  
});

recordRoutes.route("/record/addCli").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    Nome: req.body.Nome,
    CPF: req.body.CPF,
    CEP: req.body.CEP,
    Rua: req.body.Rua,
    Numero: req.body.Numero,
    Bairro: req.body.Bairro,
    Complemento: req.body.Complemento,
    Contato: req.body.Contato,
    Email: req.body.Email,
  };
  
  db_connect.collection("clientes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });  
});

recordRoutes.route("/record/addMar").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    Nome: req.body.Tipo,
    CPF: req.body.Valor,
    CEP: req.body.Observacao,
  };
  
  db_connect.collection("marmitas").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });  
  
});

recordRoutes.route("/registro").get(function (req, res) {
  let db_connect = dbo.getDb("myFirstDatabase");
  db_connect
    .collection("pedidos")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("pedidos").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 pedido foi deletado");
    response.status(obj);
  }); 
});


module.exports = recordRoutes;