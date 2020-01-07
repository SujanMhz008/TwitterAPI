const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');


function hashGen(req, res, next) {
    saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            // console.log(hash);
            req.userHash = hash;
            next();
        })
        .catch(function (err) {
            next('Error generating hash')
        })
}

function registerUser(req, res, next) {
    User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.userHash,
        profileImage: req.body.profileImage
    }).then((user) => {
        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.json({ status: "Signup success!", token: token });
    }).catch(next);
};

function userLogin(req, res, next) {
    User.findOne({ fullName: req.body.fullName })
        .then(function (user){
            if (user === null) {
                let err = new Error('User unavailable');
                err.status = 404;
                return next(err);
            }
            else {
                console.log(req.body.password)
                bcrypt.compare(req.body.password, user.password)
                   .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Either username or password donot match.');
                            err.status = 404;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    })
                    .catch(next);
            }
        })
        .catch(next);
}


module.exports = {
    hashGen,
    registerUser,
    userLogin
}