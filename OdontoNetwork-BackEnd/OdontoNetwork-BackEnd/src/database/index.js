const mongoose = require('mongoose');

// Iniciando o DB
mongoose.connect('mongodb://localhost:27017/odontonetworkapi', { useNewUrlParser: true});
mongoose.set('useCreateIndex', true);// corrige o erro: (node:2504) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useFindAndModify', false);// Corrigino mensagem de atenção: (node: DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
mongoose.Promise = global.Promise;

module.exports = mongoose;