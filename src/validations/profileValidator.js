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


    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

   

  
]