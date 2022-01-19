const { check, body } = require('express-validator');
/*const { users } = require('../dataUser/user')*/
const { users } = require('../database/users.json')
const bcrypt = require("bcryptjs");

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('El nombre es necesario'),

    check('last_name')
    .notEmpty()
    .withMessage('El apellido es necesario'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    body('email').custom((value) => { /*Comparamos las contraseñas*/
       let user = users.find(user=>{ 
            return user.email == value 
        })

        if(user){
            return false
        }else{
            return true
        }
    }).withMessage('Email registrado'),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar las bases y condiciones')
]