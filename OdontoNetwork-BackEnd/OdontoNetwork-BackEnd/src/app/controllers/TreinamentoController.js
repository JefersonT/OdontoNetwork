const moment = require('moment');
const Treinamento = require('../models/Treinamento');
const Prova = require('../models/Prova');
const Nota = require('../models/Nota');
const User = require('../models/User');

const create = async (req, res) => {
    try {
        let { titulo, url, formulario, prazo, remetente, destinatarios } = req.body;
        let status = 'Esperando';
        url = url.replace('watch?v=', 'embed/');

        prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY');

        const treinamentoI = await Treinamento.create({ titulo, url, prazo, status, remetente });

        const prova = await Prova.create({ formulario, treinamento: treinamentoI._id });

        await Treinamento.findByIdAndUpdate(treinamentoI._id, { prova: prova._id });

        if (destinatarios && destinatarios.length > 0) {
            await destinatarios.map(async function (destinatario) {

                const userDestinatario = await User.findById(destinatario);

                const nota = await Nota.create({
                    nota: 0,
                    prova: prova._id,
                    treinamento: treinamentoI._id,
                    usuario: userDestinatario._id
                });

                await Treinamento.findByIdAndUpdate(treinamentoI._id, {
                    '$push': {
                        destinatarios: userDestinatario,
                        notas: nota._id
                    }
                });
            });
        }

        const treinamento = await Treinamento.findById(treinamentoI);

        return res.send({ treinamento });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao criar treinamento!' });
    }
}

const index = async (req, res) => {
    try {
        const treinamento = await Treinamento.find().populate(['remetente', 'prova', 'notas', 'destinatarios']);

        return res.send({ treinamento });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao listar treinamentos!' });
    }
}

const show = async (req, res) => {
    try {
        const treinamento = await Treinamento.findById(req.params.treinamento_id).populate(['remetente', 'prova', 'notas', 'destinatarios']);

        return res.send({ treinamento });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao mostrar treinamento!' });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const treinamento = await Treinamento.findByIdAndUpdate(req.params.treinamento_id, {
            status: status
        }, { new: true });

        return res.send({ treinamento });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao mudar status do treinamento!' });
    }
}

const update = async (req, res) => {
    try {
        let { titulo, url, formulario, prazo, destinatarios } = req.body;

        const treinamentoI = await Treinamento.findById(req.params.treinamento_id);

        // const notas = await Nota.find({ treinamento: treinamentoI._id });
        // await Nota.findByIdAndDelete({ $in: notas });
        await treinamentoI.notas.map(async function (nota) {
            await Nota.findByIdAndDelete(nota);
        });

        let prova = await Prova.findByIdAndDelete(treinamentoI.prova);
        prova = await Prova.create({ formulario, treinamento: treinamentoI._id });

        await Treinamento.findByIdAndUpdate(treinamentoI._id, { prova: prova });

        if (destinatarios && destinatarios.length > 0) {

            await Treinamento.findByIdAndUpdate(treinamentoI._id, {
                destinatarios: [],
                notas: []
            });

            await destinatarios.map(async function (destinatario) {

                const userDestinatario = await User.findById(destinatario);

                const nota = await Nota.create({
                    nota: 0,
                    prova: prova._id,
                    treinamento: treinamentoI._id,
                    usuario: userDestinatario._id
                });

                await Treinamento.findByIdAndUpdate(treinamentoI._id, {
                    '$push': {
                        destinatarios: userDestinatario,
                        notas: nota._id
                    }
                });
            });
        }

        prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY');

        await Treinamento.findByIdAndUpdate(treinamentoI._id, { titulo, url, prazo });
        await Prova.findByIdAndUpdate(prova._id, { formulario });

        const treinamento = await Treinamento.findById(treinamentoI._id).populate(['prova', 'notas', 'destinatarios', 'remetente']);

        return res.send({ treinamento });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao alterar treinamento!' });
    }
}

const setNotas = async (req, res) => {
    try {
        const { nota, usuario } = req.body;

        const treinamentoI = await Treinamento.findById(req.params.treinamento_id);

        const notaUser = await Nota.findOneAndUpdate({
            treinamento: treinamentoI._id,
            usuario: usuario
        }, {
                nota: nota,
            }, { new: true });

        return res.send({ notaUser });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao inserir notas!' });
    }
}

const showTreinamentosUser = async (req, res) => {
    try {
        const notas = await Nota.find({
            usuario: req.params.user_id
        }).populate(['treinamento', 'usuario', 'prova']);

        return res.send({ notas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao listar treinamentos do usuário!' });
    }
}

const destroy = async (req, res) => {
    try {
        const { treinamento_id } = req.params;
        const treinamento = await Treinamento.findById(treinamento_id);

        await treinamento.notas.map(async function (nota) {
            await Nota.findByIdAndDelete(nota);
        });
        await Prova.findByIdAndDelete(treinamento.prova);
        await Treinamento.findByIdAndDelete(treinamento_id);

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao remover treinamento!' });
    }
}

module.exports = {
    create,
    index,
    show,
    changeStatus,
    update,
    setNotas,
    showTreinamentosUser,
    destroy
}