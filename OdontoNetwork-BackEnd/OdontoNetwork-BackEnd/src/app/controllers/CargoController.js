const Cargo = require('../models/Cargo');
const Funcionario = require('../models/Funcionario');

const create = async (req, res) => {
    try {
        const { nome, salario, descricao, permissao } = req.body;
        if (await Cargo.findOne({ nome }))
            return res.status(400).send({ error: 'Cargo already exist' });

        const cargo = await Cargo.create({ nome, descricao, salario, permissao });

        return res.send({ cargo });
    } catch (err) {
        //console.log(err);
        return res.status(400).send({ error: 'Error creating cargo' });
    }
};

const index = async (req, res) => {
    try {
        const cargos = await Cargo.find();

        return res.send({ cargos });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading Cargos' })
    }
};

const show = async (req, res) => {
    try {
        const cargo = await Cargo.findById(req.params.cargo_id);

        return res.send({ cargo });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading Cargo' });
    }
};

const update = async (req, res) => {
    try {
        const { nome, descricao, permissao, salario } = req.body;
        const cargo = await Cargo.findByIdAndUpdate( req.params.cargo_id, {
            nome,
            salario,
            descricao,
            permissao,
        }, { new: true });

        await cargo.save();
        return res.send({ cargo });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating cargo' });
    }
};

const destroy = async (req, res) => {
    try {
        const funcionarios = await Funcionario.find({ cargo: req.params.cargo_id });

        if (funcionarios.length)
            return res.status(400).send({ error: 'Não foi possível excluir, existem funcionários vinculados a este cargo' });
        else {
            await Cargo.findByIdAndDelete(req.params.cargo_id);

            return res.send();
        }

    } catch (err) {
        return res.status(400).send({ error: 'Error destroing cargo' });
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy,
}