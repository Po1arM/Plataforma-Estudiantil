const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grupo = new Schema({
    codigo: String,
    curso: String,
    nivel: String,
    materia: String,
    horario: String,
    maestro: String,
});

module.exports = mongoose.model('grupo', grupo);