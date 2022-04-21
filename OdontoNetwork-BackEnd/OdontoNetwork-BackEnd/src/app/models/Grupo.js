const mongoose = require('../../database');

const GrupoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,        
    },
    fundador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    membros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Grupo = mongoose.model('Grupo', GrupoSchema);

module.exports = Grupo;