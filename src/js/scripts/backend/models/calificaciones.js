const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calificaciones = new schema({

    estudiante: String,
    grupo: String,
    nota: Array

});


module.exports = mongoose.model('calificaciones', calificaciones);