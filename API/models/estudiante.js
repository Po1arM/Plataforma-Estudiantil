const {Schema, model} = require('mongose');
const Schema = mongose.Schema;
const user = mongose.model('user');


const usertSchem = new Schema ({
    curso: {type: String, required: true},
    registro: {type: Array, required: true}
});

model.export = model('user',usertSchem);