//manejo de errores

//caracteres especiales no son validos, agregar validaciones

const {
    getVideogames,
    createVideogames,
    getVideogameById,
    getVideogameByName,
  } = require('../controllers/videogames.controller')

  const getVideogamesErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.send(`Something wrong ${err.message} in getVideogames`)
  }

  