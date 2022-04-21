const User = require('../models/User');
const Grupo = require('../models/Grupo');

const create = async (req, res) => {
    try {
        const { titulo, fundador, membros } = req.body;

        if (await Grupo.findOne({ titulo: titulo }))
            return res.status(400).send({ error: 'Já existe um grupo com este nome' });

        const userFundador = await User.findById(fundador);
        const grupo = await Grupo.create({ titulo: titulo, fundador: userFundador._id });

        if (membros) {
            await membros.map(async function (integrante) {

                const userMembro = await User.findById(integrante);

                await Grupo.findByIdAndUpdate(grupo._id, {
                    '$push': {
                        membros: userMembro,
                    }
                });

            });
        }

        return res.send({ grupo });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao criar grupo' });
    }
};

const index = async (req, res) => {
    try {
        const grupos = await Grupo.find().populate(['fundador', 'membros']);

        return res.send({ grupos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar grupos' });
    }
};

const show = async (req, res) => {
    try {
        const grupo = await Grupo.findById(req.params.grupo_id).populate(['fundador', 'membros']);

        return res.send({ grupo });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao carregar grupo' });
    }
};

const search = async (req, res) => {
    try {
        const { toSearch } = req.params;
        let grupos;

        // Busca pelo Nome do Grupo
        const gruposNome = await Grupo.find({ titulo: { $regex: toSearch } }).populate(['fundador', 'membros']);

        // Busca por Nome de Membro
        const userName = await User.find({ name: { $regex: toSearch } });
        const gruposMembros = await Grupo.find({ membros: { $in: userName } }).populate(['fundador', 'membros']);

        if (gruposNome.length > 0)
            grupos = gruposNome;
        if (gruposMembros.length > 0)
            grupos = gruposMembros;

        return res.send({ grupos });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao buscar grupos' });
    }
};

const update = async (req, res) => {
    try {
        let { membros, titulo, fundador } = req.body;
        const userFundador = await User.findById(fundador);
        const grupo = await Grupo.findByIdAndUpdate(req.params.grupo_id, { fundador: userFundador, titulo: titulo }, { new: true });

        if (membros) {
            await Grupo.findByIdAndUpdate(grupo._id, { membros: [] });
            await membros.map(async function (integrante) {

                const userMembro = await User.findById(integrante);

                await Grupo.findByIdAndUpdate(grupo._id, {
                    '$push': {
                        membros: userMembro,
                    }
                }, { new: true });
            });
        }

        return res.send({ grupo });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao atualizar grupo' });
    }
};

const destroy = async (req, res) => {
    try {
        await Grupo.findByIdAndDelete(req.params.grupo_id);

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao deletar grupo' });
    }
};

module.exports = {
    create,
    index,
    show,
    search,
    update,
    destroy,
};