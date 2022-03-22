const router = require('express').Router();
const controller = require('../controllers/products');

/* basics */
router.post('/movie/new', controller.create);
router.get('/movie/view/:id', controller.read);//✔
router.put('/movie/upd/:id', controller.update);//
router.delete('/movie/dlt/:id', controller.delete);//

/* customs */
// router.get('/all', controller.allMovies);
// router.get('/genre/:id', controller.filterByGenre);
// router.????('/?????', controller.????);
// router.????('/?????', controller.????);

module.exports = router;