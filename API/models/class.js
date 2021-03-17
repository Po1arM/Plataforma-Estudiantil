const { ObjectId } = require('bson');
const {Schema, model} = require('mongose');

const matScheme = new Schema ({
    _id: {type: ObjectId, required: true},
    curo: {type: int, required: true},
    nivel: {type: String, required: true},
    materia: {type: String},
    maestra: {type: String, required: true},
    banner: {type: String, required: true} //URL de la imagen a usar como banner
});

model.export = mode('mat',matScheme);