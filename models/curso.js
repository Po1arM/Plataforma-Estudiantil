const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Esta colección define cuales son las materias que serán impartidas en un curso
const cursoSchema = new Schema({
    curso: String,
    materia: [String],
})

module.exports = mongoose.model('curso',cursoSchema);