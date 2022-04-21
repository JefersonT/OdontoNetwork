const mongoose = require('../../database');
require('mongoose-double')(mongoose);

const CargoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,        
    },
    salario: {
        type: mongoose.Schema.Types.Double,
        required: true
    },
    descricao: {
        type: String,
        required: true,
    },
    permissao: {
        type: String,
        enum: [
            'Administrador',
            'RH',
            'Gerente',
            'Usuário padrão'
        ],
        required: true,
    },
    funcionarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Funcionario',
    }],
});

const Cargo = mongoose.model('Cargo', CargoSchema);

module.exports = Cargo;