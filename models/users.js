var mongoose = require('mongoose');

var userDetails = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model(
    'User',userDetails
);