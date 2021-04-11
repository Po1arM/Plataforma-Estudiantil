const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cont = new Schema({
    cont: Number
});

module.exports = mongoose.model('cont', cont);