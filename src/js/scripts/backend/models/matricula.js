const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matricula = new Schema({
    cont: Number
});

module.exports = mongoose.model('matricula', matricula);