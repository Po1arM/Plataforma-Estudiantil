const {Schema, model} = require('mongose');
const Schema = mongose.Schema;

const usertSchem = new Schema ({
    _id: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido1: {type: String, required: true},
    apellido2: {type: String},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    tipo: {type: String, required: true},
    curso: {type: String, required: true},
    nivel: {type: String, required: true},
    registro: {type: Array, required: true}
});

model.export = model('userEs',usertSchem);