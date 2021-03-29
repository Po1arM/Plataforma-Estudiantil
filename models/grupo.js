const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grupSchema = new Schema({
    codigo: String,
    curso: String,
    materia: String,
    idMaestro: String,
    horario: String,
    //Array con las direcciones de los archivos
    archivos: [String]

})

module.exports = mongoose.model('grupo',grupSchema);