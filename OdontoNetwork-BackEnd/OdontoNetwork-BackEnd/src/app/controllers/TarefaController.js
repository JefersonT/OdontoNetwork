const moment = require('moment');
const Tarefa = require('../models/Tarefa');
const TarefaStatus = require('../models/TarefaStatus');

const create = async (req, res) => {
    try {
        let { assunto, texto, prazo, remetente, destinatario } = req.body;

        let status = 'esperando';
        prazo = moment(prazo, 'DD/MM/YYYY').format('MM/DD/YYYY');

        const tarefa = await Tarefa.create({
            assunto, texto, prazo, visualizada: false, status, remetente, destinatario,
        });

        //Status remetente
        const statusR = await TarefaStatus.create({
            entrada: false,
            enviada: true,
            arquivada: false,
            tarefa: tarefa._id,
            usuario: remetente
        });

        await Tarefa.findByIdAndUpdate(tarefa._id, {
            '$push': {
                tarefaStatus: statusR,
            }
        });

        //Status destinatario
        const statusD = await TarefaStatus.create({
            entrada: true,
            enviada: false,
            arquivada: false,
            tarefa: tarefa._id,
            usuario: destinatario
        });

        await Tarefa.findByIdAndUpdate(tarefa._id, {
            '$push': {
                tarefaStatus: statusD,
            }
        });

        return res.send({ tarefa });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao criar tarefa!' });
    }
};

const index = async (req, res) => {
    try {
        const tarefas = await Tarefa.find().populate(['remetente', 'destinatario', 'tarefaStatus']);
        return res.send({ tarefas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao listar todas as tarefas!' });
    }
};

const show = async (req, res) => {
    try {
        const tarefa = await Tarefa.findById(req.params.tarefa_id).populate(['remetente', 'destinatario', 'tarefaStatus']);
        return res.send({ tarefa });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao listar a tarefa!' });
    }
};

const changeStatus = async (req, res) => {
    try {
        const { status, motivo } = req.body;
        const tarefaA = await Tarefa.findById(req.params.tarefa_id);

        if (motivo.length > 0 || motivo !== undefined) {
            await Tarefa.findByIdAndUpdate(tarefaA._id, { status, motivo }, { new: true });
        } else {
            await Tarefa.findByIdAndUpdate(tarefa._id, { status }, { new: true });
        }

        tarefa = await Tarefa.findById(req.params.tarefa_id);

        return res.send({ tarefa });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao alterar status da tarefa!' });
    }
};

const showTasksRecebida = async (req, res) => {
    try {

        const tarefas = await Tarefa.find({
            destinatario: req.params.user_id
        }).populate(['remetente', 'destinatario', 'tarefaStatus']);

        return res.send({ tarefas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao caregar tarefas recebidas!' });
    }
};

const showTasksEnviada = async (req, res) => {
    try {

        const tarefas = await Tarefa.find({
            remetente: req.params.user_id
        }).populate(['remetente', 'destinatario', 'tarefaStatus']);

        return res.send({ tarefas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar tarefas enviadas!' });
    }
};

const showTasksArquivada = async (req, res) => {
    try {

        const tarefaStatus = await TarefaStatus.find({
            entrada: false,
            enviada: false,
            arquivada: true,
            usuario: req.params.user_id
        }).populate(['tarefa', 'tarefa[remetente]', 'usuario']);

        const tarefas_id = await Promise.all(tarefaStatus.map(async function (tarefaS) {
            return tarefaS.tarefa
        }));

        const tarefas = await Tarefa.find({
            _id: { $in: tarefas_id }
        }).populate(['remetente', 'destinatario', 'tarefaStatus']);

        return res.send({ tarefas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar tarefas arquivada!' });
    }
};

const visualizarTask = async (req, res) => {
    try {
        const { tarefa_id, user_id } = req.params;
        const tarefa = await Tarefa.findById(tarefa_id);

        if (user_id == tarefa.destinatario) {
            await Tarefa.findByIdAndUpdate(tarefa_id, {
                visualizada: true
            });
        }

        const tarefaAtualizada = await Tarefa.findById(tarefa_id).populate(['destinatario', 'remetente', 'tarefaStatus']);

        return res.send({ tarefaAtualizada });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao visualizar tarefa' });
    }
};

const arquivarTask = async (req, res) => {
    try {
        const { tarefa_id, user_id } = req.params;

        const tarefa = await Tarefa.findById(tarefa_id);

        if (tarefa.status === 'esperando')
            return res.status(400).send({ error: 'Erro! Não é possível arquivar uma tarefa em espera' });
        else if (tarefa.status === 'executando')
            return res.status(400).send({ error: 'Erro! Não é possível arquivar um tarefa em execução' });
        else if (tarefa.status === 'verificando')
            return res.status(400).send({ error: 'Erro! Não é possível arquivar uma tarefa em verificação' });

        const statusT = await TarefaStatus.findOne({
            tarefa: tarefa_id,
            usuario: user_id
        });

        if (String(statusT.usuario) == String(tarefa.remetente)) {
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                enviada: false,
                arquivada: true
            });
        } else {
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                entrada: false,
                arquivada: true
            });
        }

        const status = await TarefaStatus.findById(statusT._id);

        return res.send({ status });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao arquivar tarefa!' });
    }
};

const restaurarTask = async (req, res) => {
    try {
        const { tarefa_id, user_id } = req.params;

        const tarefa = await Tarefa.findById(tarefa_id);

        const statusT = await TarefaStatus.findOne({
            tarefa: tarefa_id,
            usuario: user_id
        });

        if (String(statusT.usuario) === String(tarefa.remetente)) {
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                enviada: true,
                arquivada: false
            });
        } else {
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                entrada: true,
                arquivada: false
            });
        }

        const status = await TarefaStatus.findById(statusT._id);

        return res.send({ status });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao restaurar tarefa!' });
    }
};

const deletarTask = async (req, res) => {
    try {
        const { tarefa_id, user_id, local_id } = req.params;

        const tarefa = await Tarefa.findById(tarefa_id);

        if (tarefa.status === 'esperando')
            return res.status(400).send({ error: 'Erro! Não é possivel excluir uma tarefa em espera.' });
        else if (tarefa.status === 'executando')
            return res.status(400).send({ error: 'Erro! Não é possivel excluir uma tarefa em execução.' });
        else if (tarefa.status === 'verificando')
            return res.status(400).send({ error: 'Erro! Não é possivel excluir uma tarefa em verificação.' });

        const statusT = await TarefaStatus.findOne({
            tarefa: tarefa_id,
            usuario: user_id
        });

        if (local_id === '1') {
            console.log('1111111-',local_id);
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                entrada: false
            });
        } else if (local_id === '2') {
            console.log('2222222-',local_id);
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                enviada: false
            });
        } else if (local_id === '3') {
            console.log('3333333-',local_id);
            await TarefaStatus.findByIdAndUpdate(statusT._id, {
                arquivada: false
            });
        }

        const status = await TarefaStatus.findById(statusT._id);
        return res.send({ status });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao excluir tarefa!' });
    }
};

const destroy = async (req, res) => {
    try {
        const tarefa = await Tarefa.findByIdAndDelete(req.params.tarefa_id);

        await tarefa.tarefaStatus.map(async function (status) {
            await TarefaStatus.findByIdAndDelete({
                _id: status
            });
        });

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao deletar tarefa!' });
    }
};

module.exports = {
    create,
    index,
    show,
    changeStatus,
    showTasksArquivada,
    showTasksRecebida,
    showTasksEnviada,
    visualizarTask,
    arquivarTask,
    restaurarTask,
    deletarTask,
    destroy
}