const { Router } = require('express');

const { getVideogames, createVideogames, getVideogameById, getVideogameByName } = require('../controllers/videogames.controller');

const videogamesRouter = Router();

videogamesRouter.get('/', getVideogames)

videogamesRouter.post('/', createVideogames)

videogamesRouter.get('/name', getVideogameByName)

videogamesRouter.get('/:id', getVideogameById)

module.exports = videogamesRouter;