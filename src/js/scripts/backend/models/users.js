const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    nombre: String,
    apellido1: String,
    apellido2: String,
    password: String,
    telefono: String,
    tipo: String,
    tutor: String,
    curso: String,
    nivel: String,
    
});

module.exports = mongoose.model('users', users);