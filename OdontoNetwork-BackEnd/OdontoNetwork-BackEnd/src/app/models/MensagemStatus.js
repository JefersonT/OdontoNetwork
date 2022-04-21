const mongoose = require('../../database');

const MensagemStatusSchema = new mongoose.Schema({
    visualizada: {
        type: Boolean,
    },
    entregue: {
        type: Boolean,
    },
    enviada: {
        type: Boolean,
    },
    arquivada: {
        type: Boolean,
    },
    mensagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mensagem',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const MensagemStatus = mongoose.model('MensagemStatus', MensagemStatusSchema);

module.exports = MensagemStatus;