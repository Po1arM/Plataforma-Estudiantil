const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudSchema = new Schema({
    nombre: String,
    apellido1: String,
    nacimiento: Date,
    curso: String,
    telefono: String,
    direccion: String,
    correo: String,
    tutor: String,
    user: String,
    password: String
})

module.exports = mongoose.model('user',estudSchema);