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

router.get('/videogames/name', getVideogameByName)

router.get('/videogames/:id', getVideogameById)


// localhost:3001/videogames/?name= " .."
router.get('/genres', getGenres)

module.exports = router;
