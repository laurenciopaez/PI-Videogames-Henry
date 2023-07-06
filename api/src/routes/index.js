const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getVideogames, createVideogames, getVideogameById, getVideogameByName, getGenres } = require('../controllers/index.controller');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getVideogames
)

router.post('/videogames', createVideogames)

router.post('/videogames/:id', getVideogameById)

router.get('/videogames/:name', getVideogameByName)

router.get('/genres', getGenres)

module.exports = router;
