const { Router } = require('express');
const { getGenres} = require('../controllers/genres.controller');

const genresRouter = Router();

genresRouter.get('/genres', getGenres)

module.exports = genresRouter;