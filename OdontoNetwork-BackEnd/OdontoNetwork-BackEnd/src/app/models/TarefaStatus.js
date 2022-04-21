const mongoose = require('../../database');

const TarefaStatusSchema = new mongoose.Schema({
    entrada: {
        type: Boolean,
    },
    enviada: {
        type: Boolean,
    },
    arquivada: {
        type: Boolean,
    },
    tarefa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarefa',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const TarefaStatus = mongoose.model('TarefaStatus', TarefaStatusSchema);

module.exports = TarefaStatus;