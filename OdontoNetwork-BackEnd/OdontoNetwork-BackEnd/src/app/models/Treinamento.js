const mongoose = require('../../database');

const TreinamentoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    prazo: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: [
            'Esperando',
            'Executando',
            'Aguardando notas',
            'Encerrado',
        ],
        required: true
    },
    prova: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prova'
    },
    notas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nota'
    }],
    remetente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destinatarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

const Treinamento = mongoose.model('Treinamento', TreinamentoSchema);

module.exports = Treinamento;