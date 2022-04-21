const mongoose = require('../../database');

const TarefaSchema = new mongoose.Schema({
    assunto: {
        type: String,
        required: true,
    },
    remetente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        //A exclusão em cascata da Tarefa pelo usuário deve feita no model de User
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //A exclusão em cascata dos remetentes da Tarefa deve feita no model de User
    },
    // Para vários destinatários
    // destinatarios: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     //A exclusão em cascata dos remetentes da Tarefa deve feita no model de User
    // }],
    texto: {
        type: String,
        required: true,
    },
    prazo: {
        type: Date,
        required: true
    },
    motivo: {
        type: String,
        required: false
    },
    visualizada: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: [
            'esperando',
            'executando',
            'verificando',
            'concluido',
            'nao_completado',
            'cancelado'
        ],
        required: true
    },
    tarefaStatus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TarefaStatus',
        required: false
    }],

});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);

module.exports = Tarefa;