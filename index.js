var express = require("express");
var mongoose = require("mongoose");
var morgan = require('morgan');
var userController = require('./controllers/userControllers');
var authController = require('./controllers/authControllers');
var dbConfig = require('./dbConfig/dbConfig');
const cors = require('cors');
var dotenv = require('dotenv').config();

var app = express();
app.use(morgan('tiny'));
app.use(express.json());

app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));

app.post('/users/v1/signup', authController.registraionValidator, userController.hashGen, userController.registerUser);

app.post('/users/v1/login', userController.userLogin);

app.listen(process.env.PORT, () => {
    console.log(`App started on localhost:${process.env.PORT}`);
});