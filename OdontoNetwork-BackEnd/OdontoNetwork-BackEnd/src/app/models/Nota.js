const mongoose = require('../../database');

const NotaSchema = new mongoose.Schema({
    nota: {
        type: mongoose.Schema.Types.Double,
    },
    prova: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Prova'
    },
    treinamento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treinamento'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Nota = mongoose.model('Nota', NotaSchema);

module.exports = Nota;