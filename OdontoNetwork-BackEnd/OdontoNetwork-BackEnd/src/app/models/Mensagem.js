const mongoose = require('../../database');

const MensagemSchema = new mongoose.Schema({
    assunto: {
        type: String,
        required: true,
    },
    remetente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        //A exclusão em cascata da mensagem pelo usuário deve feita no model de User
    },
    destinatarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    texto: {
        type: String,
        required: true,
    },
    status: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MensagemStatus',
    }],

});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

module.exports = Mensagem;