const { ObjectId } = require('bson');
const {Schema, model} = require('mongose');

const actiScheme = new Schema ({
    _id: {type: ObjectId, required: true},
    curo: {type: String, required: true},
    nivel: {type: String, required: true},
    materia: {type: String, required: true},
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    puntos: {type: int, required: true},
    //El tipo date incluye la hora
    fechaApertura: {type: Date, required: true},
    fechaEntrega: {type: Date} 
});

model.export = mode('mat',matScheme);