const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

module.exports = {
    "loginPage": (req, res) => {
        res.render('login', {
            titulo: "login"
        })
    },

    "login": async (req, res) => {
        try {

            let errors = validationResult(req);
            if (errors.isEmpty()) {

                let { email, remember } = req.body;
                const user = await db.User.findOne({
                    attributes: [
                        'name',
                        'lastname',
                        'email',
                        'avatar',
                        'avatar',
                        'rolId',
                    ],
                    where: {
                        email
                    }
                });
                // console.log(user)
                req.session.user = {
                    // id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rolId
                }

                if (remember) {
                    const TIME_IN_MILISECONDS = 60000
                    res.cookie("userTrimovie", req.session.user, {
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    })
                }

                res.locals.user = req.session.user;

                return res.redirect('/');
            }
            
            return res.render('login', {
                errors: errors.mapped(),
                titulo: "login",
            })

        } catch (error) {
            console.log(error);
        }
    },

    "registerPage": (req, res) => {
        res.render("register", {
            title: "Register Trimovie"
        });
    },

    "processRegister": async (req, res) => {
        try {
            // res.send(req.body)
            let errors = validationResult(req);
            if(errors.isEmpty()) {
                let {name, lastname, email, avatar, date, phone, pass1} = req.body;
            
                let user = {
                    name,
                    lastname,
                    email,
                    password: bcrypt.hashSync(pass1, 12),
                    avatar: req.file ? req.file.filename : "AvatarChichiro.png",
                    // date
                    // phone
                    rolId: 2,
                }

                let creado = await db.User.create(user)

                if(creado){
                    return res.redirect('/user/login');
                }
            }

            return res.render("register", {
                        errors: errors.mapped(),
                        old: req.body,
                    })

        } catch (error) {
            console.log(error);
        }
    },
    
    "logout": (req, res) => {
        req.session.destroy();
        if (req.cookies.userTrimovie) {
            res.cookie('userTrimovie', "", {
                maxAge: -1
            })
        }
        res.redirect('/')
    },

    "profile": async (req, res) => { 

         
        Users.findByPk(req.session.user.id,  {
            include: [{association: 'rol'}]
        }) 
        .then((user) => {
            res.render('user/profile', {
                user,
                session: req.session
            })
        })
    },

    "edit":  async (req, res) => {  
        let errors = validationResult(req);
       if(errors.isEmpty()) {
        Users.update({
            name: req.body.name,
            lastname: req.body.name,
            email: req.body.email,
            password:req.body.pass,
         
        },{
            where: {
                id: req.session.user.id
            }
        })
        .then(() => {
            res.redirect('user/profile')
        })
        .catch((error) => {console.log(error)});
        
    } 

    },

    "carrito": (req, res) => {
        res.render("carrito", {
            title: "carrito",
            session: req.session.user
        });
    },

}