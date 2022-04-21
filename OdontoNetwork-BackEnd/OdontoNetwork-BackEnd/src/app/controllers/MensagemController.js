const Cargo = require('../models/Cargo');
const Funcionario = require('../models/Funcionario');
const Mensagem = require('../models/Mensagem');
const MensagemStatus = require('../models/MensagemStatus');
const User = require('../models/User');

const create = async (req, res) => {
    try {
        const { assunto, remetente, texto, destinatarios } = req.body;

        const mensagem = await Mensagem.create({ assunto, remetente, texto });

        const statusM = await MensagemStatus.create({
            visualizada: false,
            entregue: false,
            enviada: true,
            arquivada: false,
            mensagem: mensagem._id,
            usuario: remetente
        });

        await Mensagem.findByIdAndUpdate(mensagem._id, {
            '$push': {
                status: statusM._id,
            }
        });

        if (destinatarios && destinatarios.length > 0) {
            await destinatarios.map(async function (destinatario) {

                const userDestinatario = await User.findById(destinatario);

                await Mensagem.findByIdAndUpdate(mensagem._id, {
                    '$push': {
                        destinatarios: userDestinatario,
                    }
                });

                if (destinatario != mensagem.remetente) {
                    const mS = await MensagemStatus.create({
                        visualizada: false,
                        entregue: true,
                        enviada: false,
                        arquivada: false,
                        mensagem: mensagem._id,
                        usuario: destinatario
                    });

                    await Mensagem.findByIdAndUpdate(mensagem._id, {
                        '$push': {
                            'status': mS._id,
                        }
                    });
                }
            });
        }

        return res.send({ mensagem });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao Criar Mensagem' });
    }
};

const index = async (req, res) => {
    try {
        const mensagens = await Mensagem.find().populate(['remetente', 'status', 'destinatarios']);
        return res.send({ mensagens });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar Mensagens' });
    }
};

const show = async (req, res) => {
    try {
        const mensagens = await Mensagem.findById(req.params.mensagem_id).populate(['remetente', 'status', 'destinatarios']);
        return res.send({ mensagens });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar Mensagem' });
    }

};

const showMensagensRecebidas = async (req, res) => {
    try {
        const mensagem = await Mensagem.find({
            destinatarios: req.params.user_id
        }).populate(['remetente', 'status', 'destinatarios']);

        return res.send({ mensagem });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar Mensagens Recebidas' });
    }
};

const showMensagensEnviadas = async (req, res) => {
    try {
        const noArquivadas = await MensagemStatus.find({
            arquivada: false
        }).populate(['mensagem', 'usuario']);

        const mensagens = await Mensagem.find({
            remetente: req.params.user_id,
            status: { $in: noArquivadas }
        }).populate(['remetente', 'destinatarios', 'status']);


        return res.send({ mensagens });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar Mensagens Enviadas' });
    }

};

const showMensagensArquivadas = async (req, res) => {
    try {
        const arquivadas = await MensagemStatus.find({
            entregue: false,
            enviada: false,
            arquivada: true,
            usuario: req.params.user_id
        }).populate(['mensagem', 'usuario']);

        const mensagens = await Mensagem.find({
            status: { $in: arquivadas }
        }).populate(['status', 'remetente', 'destinatarios']);

        return res.send({ mensagens });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar Mensagens Arquivadas' });
    }

};

const visualizarMensagem = async (req, res) => {
    try {
        const status = await MensagemStatus.findOneAndUpdate({
            mensagem: req.params.mensagem_id,
            usuario: req.params.user_id
        }, { visualizada: true }, { new: true });

        return res.send({ status });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao visualizar Mensagem' });
    }

};

const arquivarMensagem = async (req, res) => {
    try {
        const status = await MensagemStatus.findOne({
            mensagem: req.params.mensagem_id,
            usuario: req.params.user_id
        });

        const mensagem = await Mensagem.findById(req.params.mensagem_id);
        const statusUser = status.usuario;
        const mensagemRemetente = mensagem.remetente;

        if (statusUser.toString() === mensagemRemetente.toString()) {
            const statusMensagem = await MensagemStatus.findByIdAndUpdate(status, { enviada: false, arquivada: true }, { new: true });
            return res.send({ statusMensagem });
        }
        else {
            const statusMensagem = await MensagemStatus.findByIdAndUpdate(status, { entregue: false, arquivada: true }, { new: true });
            return res.send({ statusMensagem });
        }

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao arquivar Mensagem' });
    }

};

const restaurarMensagem = async (req, res) => {
    try {
        const status = await MensagemStatus.findOne({
            mensagem: req.params.mensagem_id,
            usuario: req.params.user_id
        });

        const mensagem = await Mensagem.findById(req.params.mensagem_id);
        const statusUser = status.usuario;
        const mensagemRemetente = mensagem.remetente;

        if (statusUser.toString() === mensagemRemetente.toString()){
            const statusMensagem = await MensagemStatus.findByIdAndUpdate(status, { enviada: true, arquivada: false }, { new: true });
            return res.send({ statusMensagem });
        } else {
            const statusMensagem = await MensagemStatus.findByIdAndUpdate(status, { entregue: true, arquivada: false }, { new: true });
            return res.send({ statusMensagem });
        }

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao restaurar Mensagem' });
    }

};

const destroy = async (req, res) => {
    try {
        const mensagem = await Mensagem.findByIdAndDelete(req.params.mensagem_id);

        await mensagem.status.map(async function (status) {
            await MensagemStatus.findByIdAndDelete({
                _id: status
            });
        });

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao destruir a Mensagem' });
    }

};

module.exports = {
    create,
    index,
    show,
    showMensagensRecebidas,
    showMensagensEnviadas,
    showMensagensArquivadas,
    visualizarMensagem,
    arquivarMensagem,
    restaurarMensagem,
    destroy
};