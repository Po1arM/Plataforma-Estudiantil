const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pensum = new Schema({
    curso: String,
    nivel: String,
    materia: Array
   
});

module.exports = mongoose.model('pensum', pensum);