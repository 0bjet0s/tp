const db = require('../database/models');

module.exports = {
    inicio: (req, res) => {

        let movies = db.Movie.findAll()
        let genres = db.Genre.findAll()
        let years = db.Movie.findAll({
            attributes: ['year'],
            group: ["year"],
            having: "",
        })
        Promise.all([movies, genres, years])

            .then(([movies, genres, years]) => {
                return res.render('home', {
                    titulo: "Inicio",
                    peliculas: movies,
                    generos: genres,
                    anios: years.map(element => element.year),
                    session: req.session.user
                })
            })
            .catch(error => console.log(error))



    },

    filterByGenre: async (req, res) => {
        try {
            let id = req.params.id;
            // console.log(`id: ${id}`)
            let genre = await db.Genre.findByPk(id, {
                include: [{ all: true }]
            });
            let genres = await db.Genre.findAll();
            let dataYears = await db.Movie.findAll({
                attributes: ["year"],
                group: ["year"],
                // having: "",
            })
            return res.render('home', {
                titulo: "Trimovie - Inicio",
                peliculas: genre.movies,
                generos: genres,
                anios: dataYears.map(element => element.year),
                session: req.session.user,
            })
        } catch (error) {
            console.log(error)
        }
    },
}