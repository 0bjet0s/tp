let { check, body } = require('express-validator');
const res = require('express/lib/response');
const { getUsers } = require('../database')
const bcrypt = require('bcryptjs')
const db = require('../database/models');

module.exports = [
    check('email')
    .notEmpty()
    .withMessage('Debes ingresar un email').bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    
    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail(),

    body('custom')
        .custom((value, {req}) => {
            return db.User.findOne({
                where: { email: req.body.email}
            })
            .then(user => {
                // console.log(user)
                if(!bcrypt.compareSync(req.body.pass, user.dataValues.password))
                    return Promise.reject();
            })
            .catch(error => {
                return Promise.reject("Credenciales inválidas")
            })
            
        })
        .withMessage('Credenciales inválidas')
]