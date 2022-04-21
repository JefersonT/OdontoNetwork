const User = require('../models/User');
const validator = require('validator');

const index = async (req, res) => {
    try {
        const users = await User.find();

        return res.send({ users, user: req.user_id });
    } catch (err) {
        return res.status(400).send({ error: err });
    }
}

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);

        return res.send({ user });
    } catch (err) {
        //console.log(err);
        return res.status(400).send({ error: 'Erro ao mostrar usuario' });
    }
}

const update = async (req, res) => {
    const { name, email } = req.body;
    try {

        if (!validator.isEmail(email))
            return res.status(400).send({ error: 'Invalid email' });

        return res.send(await User.findByIdAndUpdate((req.params.user_id ? req.params.user_id : req.user_id), {
            name,
            email
        }, { new: true }));
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Error updating User' });
    }
}

const destroy = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.user_id);

        return res.status(204).send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting user' });
    }
}

module.exports = {
    index,
    show,
    update,
    destroy,
}
