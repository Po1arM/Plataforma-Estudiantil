const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudiante = new Schema({
    nombre: String,
    apellido: String,
    matricula: String,
    correo: String,
    nacimiento: Date,
    password: String,
    telefono: String,
    curso: String,
    nivel: String,
    direccion: String,
    tutor: String,
    letra: String
});

module.exports = mongoose.model('estudiante', estudiante);