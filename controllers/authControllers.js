var bcrypt = require('bcryptjs');
var js = require('jsonwebtoken');
const User = require('../models/users');

function registraionValidator(req,res,next){
    User.findOne({fullName: req.body.fullName})
    .then((user) => {
        if(user !== null){
            res.json({
                Status: "409",
                Error: "User already exists"
            }); 
        }
    })
    .catch(next);
};

module.exports = {
    registraionValidator
};