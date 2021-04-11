const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docente = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    nacimiento: Date,
    password: String,
    especialidad: String,
    especialidad2: String,
    telefono: String,
    direccion: String,
    });

module.exports = mongoose.model('docente', docente);