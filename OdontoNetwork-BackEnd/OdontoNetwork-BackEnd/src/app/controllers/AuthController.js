const express = require('express');
const bcrytp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../../config/auth');
const User = require('../models/User');
const mailer = require('../../modules/mailer');
const validator = require('validator');

function generetaToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

const register = async (req, res) => {
    const { email } = req.body;
    try {
        if (!validator.isEmail(email))
            return res.status(400).send({ error: 'Invalid email' });

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generetaToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'User not fonund' });

    if (!await bcrytp.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    res.send({
        user,
        token: generetaToken({ id: user.id }),
    });
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });


        mailer.sendMail({
            to: email,
            from: 'jtf.10@hotmail.com',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if (err)
                return res.status(400).send({ error: 'Cannot send forgot password email' });

            return res.send();
        });

        //console.log(token, now); // Para testar token sem net
    } catch (err) {
        res.status(400).send({ error: 'Erro on forgot password, try again' });
    }
};

const resetPassword = async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'User not found' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' });

        user.password = password;

        await user.save();

        res.send();

    } catch (err) {
        res.status(400).send({ error: 'Cannot reset password, try again' })
    }
};

module.exports = {
    register,
    authenticate,
    forgotPassword,
    resetPassword
}