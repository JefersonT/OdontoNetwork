const Funcionario = require('../models/Funcionario');
const User = require('../models/User');
const Cargo = require('../models/Cargo');
const Mensagem = require('../models/Mensagem');
const Tarefa = require('../models/Tarefa');
const Treinamento = require('../models/Treinamento');
const TarefaStatus = require('../models/TarefaStatus');
const Grupo = require('../models/Grupo');
const Nota = require('../models/Nota');
const MensagemStatus = require('../models/MensagemStatus');
const validator = require('validator');
const moment = require('moment');

const create = async (req, res) => {
    try {
        let {
            name, email, password,
            cpf, clinica, data_nascimento, cargo
        } = req.body;

        const users = await User.findOne({ email });

        if (!cargo)
            return res.status(400).send({ error: 'Cargo vazio' });

        if (users)
            return res.status(400).send({ error: 'Já existe usuário com este email' });

        if (!validator.isEmail(email))
            return res.status(400).send({ error: 'Email Inválido' });

        data_nascimento = moment(data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');

        const funcionario = await Funcionario.create({ cpf, clinica, data_nascimento, cargo });

        const funcionarioUser = new User({ name, email, password, funcionario: funcionario._id });
        await funcionarioUser.save();
        await Funcionario.findByIdAndUpdate(funcionario._id, { 'user': funcionarioUser._id });

        await funcionario.save();

        await Cargo.findByIdAndUpdate(cargo, {
            '$push': {
                funcionarios: funcionario._id,
            }
        });

        return res.send({ funcionario });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Error creating Funcionario' });
    }
};

const index = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find().populate(['cargo', 'user']);

        return res.send({ funcionarios });
    } catch (err) {
        return res.status(400).send({ error: 'Erro Carregamento de funcionarios' });
    }
};

const show = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.funcionario_id).populate(['cargo', 'user']);

        if (funcionario)
            return res.send({ funcionario });
        else
            return res.status(400).send({ error: 'Erro, Funcionario não existe' });
    } catch (err) {
        return res.status(400).send({ error: 'Error ao carregar funcionario' });
    }
};

const search = async (req, res) => {
    try {
        const { toSearch } = req.params;
        let funcionarios;

        // Busca por Clinica
        const funcionariosClinica = await Funcionario.find({ clinica: { $regex: toSearch } }).populate(['cargo', 'user']);

        // Busca por Cargo
        const fCargo = await Cargo.find({ 'nome': { $regex: toSearch }, 'funcionarios': { $ne: [] } }, {
            include: [
                {
                    model: Funcionario,
                    as: 'funcionario',
                    through: { atributes: [] },
                }
            ]
        });
        const funcionariosCargo = await Funcionario.find({ cargo: fCargo }).populate(['cargo', 'user']);

        // Buscar por Usuario
        const fUser = await User.find({ $or: [{ 'name': { $regex: toSearch } }, { 'email': { $regex: toSearch } }] }, {
            include: [
                {
                    model: Funcionario,
                    as: 'funcionario',
                    through: { atributes: [] },
                }
            ]
        });
        const funcionariosUser = await Funcionario.find({ user: fUser }).populate(['cargo', 'user']);

        if (funcionariosClinica.length > 0)
            funcionarios = funcionariosClinica;
        if (funcionariosCargo.length > 0)
            funcionarios = funcionariosCargo;
        if (funcionariosUser.length > 0)
            funcionarios = funcionariosUser;

        return res.send({ funcionarios });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao realizar busca' });
    }
};

const update = async (req, res) => {
    try {
        let {
            name, email, password,
            clinica, cpf, data_nascimento, cargo
        } = req.body;


        if (!validator.isEmail(email))
            return res.status(400).send({ error: 'Email Inválido' });

        const funcionario = await Funcionario.findById(req.params.funcionario_id);

        if (!funcionario)
            return res.status(400).send({ error: 'Erro, funcionário não encontrado' });


        const user = await User.findById(funcionario.user);
        const cargoUser = await Cargo.findById(funcionario.cargo);

        data_nascimento = moment(data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');

        await Funcionario.findByIdAndUpdate(req.params.funcionario_id, { 'clinica': clinica, 'cpf': cpf, 'data_nascimento': data_nascimento });

        if (name || email || password) {
            user.set({ name, email, password });
            await user.save();
        }

        if (cargo && cargo.length > 0) {

            await Cargo.findByIdAndUpdate(cargoUser._id, {
                '$pull': {
                    funcionarios: funcionario._id,
                }
            });

            await Funcionario.findByIdAndUpdate(funcionario._id, { 'cargo': cargo });

            await Cargo.findByIdAndUpdate(cargo, {
                '$push': {
                    funcionarios: funcionario._id,
                }
            });
        }

        const employee = await Funcionario.findById(req.params.funcionario_id).populate(['cargo', 'user']);
        return res.send({ employee });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao atualizar funcionario' });
    }
};

const destroy = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.funcionario_id);
        const user = await User.findById(funcionario.user);
        const cargoUser = await Cargo.findById(funcionario.cargo);

        const treinamentoEnviado = await Treinamento.find({
            remetente: user._id,
            status: {
                $in: [
                    'Esperando',
                    'Executando',
                    'Aguardando notas',
                ]
            }
        });

        const tarefaEnviada = await Tarefa.find({
            remetente: user._id,
            status: {
                $in: [
                    'esperando',
                    'executando',
                    'verificando'
                ]
            }
        });

        const tarefaRecebida = await Tarefa.find({
            destinatario: user._id,
            status: {
                $in: [
                    'esperando',
                    'executando',
                    'verificando'
                ]
            }
        });

        if (!funcionario)
            return res.status(400).send({ error: 'Erro, funcionário não encontrado' });

        // Verificando se há tarefas vinculadas para poder ou não excluir funcionário
        if (tarefaEnviada.length || tarefaRecebida.length || treinamentoEnviado.length)
            return res.status(400).send({ error: 'Não foi possível excluir, existem tarefas vinculadas a este funcionário e/ou Treinamentos enviados por este funcionário!' })
        else {
            // Remover tarefas encerradas vinculadas ao funcionário
            const tarefas = await Tarefa.find({
                $or: [
                    { remetente: user._id, },
                    { destinatario: user._id }
                ]
            });

            await tarefas.map(async function (tarefa) {
                await Tarefa.findByIdAndDelete(tarefa._id);
            });

            // Remover Status de Tarefas vinculadas ao Usuario
            const statusTarefas = await TarefaStatus.find({ usuario: user._id });

            await statusTarefas.map(async function (statusTarefa) {
                await TarefaStatus.findByIdAndDelete(statusTarefa._id);
            });


            // Removendo Usuario de treinamentos
            const treinamentos = await Treinamento.find({ destinatarios: user._id });

            await treinamentos.map(async function (treinamento) {
                await Treinamento.findByIdAndUpdate(treinamento._id, {
                    '$pull': {
                        destinatarios: user._id,
                    }
                });
            });
            
            // Deletando treinamentos finalizados enviados pelo usuário
            const treinamentosRemetente = await Treinamento.find({ remetente: user._id });

            await treinamentosRemetente.map(async function (treinamento) {
                await Treinamento.findByIdAndDelete(treinamento._id);
            });

            // Removendo Notas do Usuario
            const notas = await Nota.find({ usuario: user._id });

            await notas.map(async function (nota) {
                await Nota.findByIdAndDelete(nota._id);
            });

            // Remover Usuario dos grupos
            const grupos = await Grupo.find({ membros: user._id });

            await grupos.map(async function (grupo) {
                await Grupo.findByIdAndUpdate(grupo._id, {
                    '$pull': {
                        membros: user._id,
                    }
                });
            });
            
            // Deletar grupos fundados
            const gruposFundador = await Grupo.find({ fundador: user._id });

            await gruposFundador.map(async function (grupo) {
                await Grupo.findByIdAndDelete(grupo._id);
            });
            
            
            // Apagando mensagens Enviadas e status vinculados
            const mensagensEnviadas = await Mensagem.find({ remetente: user._id });

            await mensagensEnviadas.map(async function (mensagem) {
                await mensagem.status.map(async function (status) {
                    await MensagemStatus.findByIdAndDelete({
                        _id: status
                    });
                });

                await Mensagem.findByIdAndDelete(mensagem);
            });

            // Removendo usuário de mensagens recebidas
            const mensagensRecebidas = await Mensagem.find({ destinatarios: user._id });

            await mensagensRecebidas.map(async function (mensagem) {
                await Mensagem.findByIdAndUpdate(mensagem._id, {
                    '$pull': {
                        destinatarios: user._id,
                    }
                });
            });

            // Apagendo statusMensagem vinculados ao usuario
            const statusMensagem = await MensagemStatus.find({ usuario: user._id });

            await statusMensagem.map(async function (statusM) {
                await MensagemStatus.findByIdAndDelete(statusM);
            });

            // Deletando Usuario
            await User.findByIdAndDelete(user._id);

            // Deletando Funcionário
            await Funcionario.findByIdAndDelete(req.params.funcionario_id);

            // Removendo Usuario de cargo
            await Cargo.findByIdAndUpdate(cargoUser._id, {
                '$pull': {
                    funcionarios: funcionario._id,
                }
            });

            return res.send();
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao apagar funcionario' });
    }
};

module.exports = {
    create,
    index,
    show,
    search,
    update,
    destroy,
}