//Conexão com banco de dados:
const mongoose = require('mongoose');
const HomeSchema = new mongoose.Schema({
    titulo:{type: String, required: true},
    desc: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;