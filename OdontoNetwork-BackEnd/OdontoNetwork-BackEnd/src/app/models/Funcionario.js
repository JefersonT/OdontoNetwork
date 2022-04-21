const mongoose = require('../../database');

const FuncionarioSchema = new mongoose.Schema({
    clinica: {
        type: String,
        required: true,        
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cargo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargo',
    },
    excluido: {
        type: Boolean
    }
});

const Funcionario = mongoose.model('Funcionario', FuncionarioSchema);

module.exports = Funcionario;