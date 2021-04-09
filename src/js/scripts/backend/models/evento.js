const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evento = new Schema({
    titulo: String,
    descripcion: String,
    });

module.exports = mongoose.model('evento', evento);