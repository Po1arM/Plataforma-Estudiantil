const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calificacion = new Schema({

    estudiante: String,
    grupo: String,
    nota: Array,
    comentario: String
});


module.exports = mongoose.model('calificacion', calificacion);