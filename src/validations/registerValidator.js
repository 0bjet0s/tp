const { check, body } = require('express-validator');
const {getUsers} = require('../database')

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

    body('email').custom((value) => { /*Comparamos las contraseñas*/
       let user = getUsers.find(user => user.email == value);

        return (user!=undefined? false : true);
    }).withMessage('Email registrado'),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    
    check('pass2').custom((value, {req}) => value !== req.body.pass1? false : true)
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('pass2').custom((value, {req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden'),
    
    check('terms')
    .isString('on')
    .withMessage('Debes aceptar las bases y condiciones')
]