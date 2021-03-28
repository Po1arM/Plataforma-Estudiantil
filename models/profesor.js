const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profeSchema = new Schema({
    nombre: String,
    apellido1: String,
    nacimiento: Date,
    telefono: String,
    direccion: String,
    correo: String,
    user: String,
    password: String
})

module.exports = mongoose.model('prof',profeSchema);