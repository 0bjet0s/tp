const { check, body } = require('express-validator');
const db = require('../database/models')

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El nombre es necesario'),

    check('lastname')
    .notEmpty()
    .withMessage('El apellido es necesario'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email').custom((value) => {
        /*Comparamos las contraseñas*/
        return db.User.findOne({
            where: { email: value, }
        })
        .then(user => {
            if(user) return Promise.reject("Email ya registrado");
        })
    }),//.withMessage('Email registrado'),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('pass2').custom((value, {
        req
    }) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar las bases y condiciones')
]