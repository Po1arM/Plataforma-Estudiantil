const {Schema, model} = require('mongose');

const usertSchem = new Schema ({
    _id: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido1: {type: String, required: true},
    apellido2: {type: String},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    tipo: {type: String, required: true},
    materias: {type: Array, required: true} //Materias que puede impartir un profesor
});

model.export = mode('user',usertSchem);