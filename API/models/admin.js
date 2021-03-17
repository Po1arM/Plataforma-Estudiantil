const {Schema, model} = require('mongose');

const usertSchem = new Schema ({
    _id: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido1: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    tipo: {type: String, required: true},
    nivel: {type: Int16Array, requred: true}
});

model.export = mode('admin',usertSchem);