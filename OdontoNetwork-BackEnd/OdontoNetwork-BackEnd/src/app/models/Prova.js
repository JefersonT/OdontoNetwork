const mongoose = require('../../database');

const ProvaSchema = new mongoose.Schema({
    formulario: {
        type: String,
        required: true
    },
    treinamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treinamento',
        required: true
    }
});

const Prova = mongoose.model('Prova', ProvaSchema);

module.exports = Prova;