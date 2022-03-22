const db = require('../../database/models');

module.exports = {

    /* basics */
    "create": async (req, res) => {

        try {

            let { title, directorId, length, year, price, trailer, sinopsis } = req.body

            let isCreate = await db.Movie.create({
                title: title.trim(),
                directorId: +directorId,
                length: +length,
                year: +year,
                price: +price ,
                trailer: trailer.trim(),
                sinopsis: sinopsis.trim(),
                image: req.file ? req.file.filename : 'notImage.png'
            })

            if (isCreate) {
                return res.status(201).json({//creado 201
                    status: res.status,
                    url: req.url,
                    ok: true,
                })
            }

            return res.status(501).json({//no implementado 501
                status: res.status,
                url: req.url,
                ok: false,
            });

        } catch (error) {
            console.error(error);
        }
    },

    "read": async (req, res) => {

        try {

            let id = req.params.id;

            let movie = await db.Movie.findByPk(id, {
                include: [{
                    all: true
                }]
            })

            // console.log(movie)
            if (movie != null) {
                return res.status(200).json({//correcto 200
                    meta: {
                        status: res.status,
                        url: req.url,
                        ok: true,
                    },
                    data: {
                        movie,
                    }
                })
            }

            return res.status(209).json({//desconocido 209
                meta: {
                    status: res.status,
                    url: req.url,
                    ok: false,
                },
                data: {
                    movie,
                }
            })

        } catch (error) {
            console.error(error);
        }
    },

    "update": async (req, res) => {

        try {

            let id = req.params.id;
            let {title, directorId, length, year, price, trailer, sinopsis} = req.body;
            let updates = {};

            if(title) updates['title'] = title.trim();
            if(directorId) updates['directorId'] = directorId;
            if(length) updates['length'] = +length;
            if(year) updates['year'] = +year;
            if(price) updates['price'] = +price;
            if(trailer) updates['trailer'] = trailer.trim();
            if(sinopsis) updates['sinopsis'] = sinopsis.trim();
            if(req.file) updates['image'] = req.file.filename;

            // console.log(updates)
            let isUpdate = await db.Movie.update({
                ...updates
            }, {
                where: {
                    id
                }
            }, )

            if(isUpdate != 0) {
                return res.status(200).json({//ok 200
                    meta: {
                        status: res.status,
                        url: req.url,
                        ok: true,
                    },
                })
            }

            return res.status(501).json({//no implementado 501
                meta: {
                    status: res.status,
                    url: req.url,
                    ok: false,
                },
            })

        } catch (error) {
            console.error(error);
        }

    },

    "delete": async(req, res) => {

        try {
            
            let isDestroy = await db.movie.destroy({
                where: {
                    id: req.params.id,
                }
            })
console.log(isDestroy);
            if(isDestroy) {
                return res.status(200).json({
                    meta: {
                        status: res.status,
                        url: req.url,
                        ok: true,
                    },
                })
            }

        } catch (error) {
            console.error(error);
        }

    },


    /* customs */

}