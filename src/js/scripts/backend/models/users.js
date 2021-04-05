const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    cod : String,
    user: String,
    password: String,
    tipo: String
    
});

module.exports = mongoose.model('users', users);