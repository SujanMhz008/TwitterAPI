var express = require("express");
var mongoose = require("mongoose");
var morgan = require('morgan');
var userController = require('./controllers/userControllers');
var authController = require('./controllers/authControllers');
var imageController = require('./controllers/imageController');
var dbConfig = require('./dbConfig/dbConfig');
const cors = require('cors');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();

var app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser({extended: true }));

app.use(express.static(__dirname + "/public"));

app.post('/users/v1/signup', authController.registraionValidator, userController.hashGen, userController.registerUser);

app.post('/users/v1/imageUpload', imageController.image, imageController.imageFileName);
app.post('/users/v1/login', userController.userLogin);

app.listen(process.env.PORT, () => {
    console.log(`App started on localhost:${process.env.PORT}`);
});