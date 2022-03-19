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
    check('phone')
    .isInt()
    .withMessage('Debe ingresar un numero de telefono válido'),

    check('date')
    .isDate()
    .withMessage('Debe ingresar una fecha válida')

]